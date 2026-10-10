# 실행: 저장소 폴더에서 powershell -ExecutionPolicy Bypass -File .\scripts\archive-unused-health-assets.ps1
# 현재 사용 중인 반응형 이미지와 코드에서 직접 참조한 파일은 유지합니다.
# 나머지는 public 밖으로 이동합니다. 삭제하거나 기존 보관 파일을 덮어쓰지 않습니다.
param(
  [string]$RepoPath = (Split-Path -Parent $PSScriptRoot)
)

$ErrorActionPreference = 'Stop'
$assetPath = Join-Path $RepoPath 'public\assets\health'
$artworkPath = Join-Path $RepoPath 'src\pages\health\Artwork.tsx'
$artwork = [System.IO.File]::ReadAllText($artworkPath)

# Artwork.tsx의 이미지 이름·해상도·버전을 읽어 실제 사용 목록을 만듭니다.
$version = [regex]::Match($artwork, '-(v\d+)-\$\{width\}\.webp').Groups[1].Value
$families = [regex]::Matches($artwork, '(?m)^\s*(\w+):\s*\{\s*widths:\s*\[([^\]]+)\]')
if (!$version -or $families.Count -eq 0) {
  throw 'Cannot identify active images from Artwork.tsx. No files were moved.'
}
$activeNames = @()
foreach ($family in $families) {
  foreach ($width in ($family.Groups[2].Value -split ',')) {
    $activeNames += '{0}-{1}-{2}.webp' -f $family.Groups[1].Value, $version, $width.Trim()
  }
}

# 사용 파일이 빠져 있다면 먼저 확인하도록 중단합니다.
foreach ($name in $activeNames) {
  if (!(Test-Path -LiteralPath (Join-Path $assetPath $name))) {
    throw "Active image is missing: $name. No files were moved."
  }
}

# 다른 화면이나 스타일에서 파일명을 직접 참조하는 경우에도 보관 대상으로 제외합니다.
$sourceText = (Get-ChildItem -LiteralPath (Join-Path $RepoPath 'src') -Recurse -File |
  Where-Object { $_.Extension -in '.tsx', '.ts', '.css', '.js', '.json', '.html' } |
  ForEach-Object { [System.IO.File]::ReadAllText($_.FullName) }) -join "`n"
$unused = @(Get-ChildItem -LiteralPath $assetPath -File |
  Where-Object { $_.Name -notin $activeNames -and !$sourceText.Contains($_.Name) })

if ($unused.Count -eq 0) {
  Write-Host 'No unused files found. All files were kept.'
  return
}

# 시각 + 고유 번호로 별도 보관 위치를 만들어 덮어쓰기를 방지합니다.
$archiveName = (Get-Date -Format 'yyyyMMdd-HHmmss') + '-' + [guid]::NewGuid().ToString('N').Substring(0, 8)
$archivePath = Join-Path $RepoPath ("asset-archive\health\" + $archiveName)
New-Item -ItemType Directory -Path $archivePath | Out-Null
foreach ($file in $unused) {
  Move-Item -LiteralPath $file.FullName -Destination (Join-Path $archivePath $file.Name)
  Write-Host ('Archived: ' + $file.Name)
}
Write-Host ("Archived {0} file(s) to {1}" -f $unused.Count, $archivePath)
