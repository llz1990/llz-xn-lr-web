#************************************************************
# Author:	Wu Shenghui
# Create At: 2019/08/15
#
# Describe: Update node modules
#************************************************************
$PSScriptRoot = Split-Path -Parent -Path $MyInvocation.MyCommand.Definition
$ProjectRoot = "$PSScriptRoot/../.."
$NodeModulesDir = "$ProjectRoot/node_modules"
$NodeModulesZipFile = "$ProjectRoot/zip_node_modules/node_modules.7z"

function New-AliasSafe {
    param(
        [Parameter(Mandatory=$true)]
        [string]
        $Name,

        [Parameter(Mandatory=$true)]
        [string]
        $Value
    )

    if (!(Test-Path alias:$Name)) {
        New-Alias -Name $Name -Value $Value -Scope Global
        Write-Verbose "Alias $Name created successfully!"
    } else {
        Write-Verbose "Another alias with $Name already exists!"
    }
}

function Init-7Z
{
    if (-not (Test-Path "$PSScriptRoot\7z.exe"))
    {
        throw "$PSScriptRoot\7z.exe needed"
    }

    New-AliasSafe -Name 7z "$PSScriptRoot\7z.exe"
}

function Expand
{
    param(
        $Source,
        $Target
    )

    7z x "$Source" -o"$Target"
}

function Remove-Tree
{
    param(
        $Path
    )

    Remove-Item $Path -force -Recurse -ErrorAction silentlycontinue

    if (Test-Path "$Path\" -ErrorAction silentlycontinue)
    {
        $folders = Get-ChildItem -Path $Path –Directory -Force
        ForEach ($folder in $folders)
        {
            Remove-Tree $folder.FullName
        }

        $files = Get-ChildItem -Path $Path -File -Force

        ForEach ($file in $files)
        {
            Remove-Item $file.FullName -force
        }

        if (Test-Path "$Path\" -ErrorAction silentlycontinue)
        {
            Remove-Item $Path -force
        }
    }
}

function Main
{
    Write-Output "Begining..."

    Init-7Z

    Write-Output "Removing node_modules ..."

    Remove-Tree $NodeModulesDir

    Expand $NodeModulesZipFile $ProjectRoot
}

Main
