#!/usr/bin/env python3
import json
import plistlib
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
APP_ID = "mobile_emr_gbc_stg"
VERSION = "0.7.3"
BUNDLE_ID = "com.ezcaretech.emr.gbc.staging"
BASE_URL = "https://ezcaretech-com.github.io/apps/mobile-emr/gbc-stg"
APK_URL = (
    "https://github.com/ezcaretech-com/ezcaretech-com.github.io/releases/download/"
    "mobile-emr-gbc-stg-v0.7.3/app-gbcstaging-release.apk"
)


def main():
    apps = json.loads((ROOT / "assets/apps.json").read_text())['apps']
    matches = [app for app in apps if app['id'] == APP_ID]
    assert len(matches) == 1, f"expected one {APP_ID} entry, found {len(matches)}"

    app = matches[0]
    downloads = {item['platform'].upper(): item for item in app['downloads']}
    assert downloads['ANDROID']['version'] == VERSION
    assert downloads['ANDROID']['url'] == APK_URL
    assert downloads['IOS']['version'] == VERSION
    assert downloads['IOS']['url'] == (
        "itms-services://?action=download-manifest&url="
        f"{BASE_URL}/manifest.plist"
    )

    release_dir = ROOT / "apps/mobile-emr/gbc-stg"
    for filename in ('emr.ipa', 'manifest.plist', 'app-icon.png'):
        assert (release_dir / filename).is_file(), f"missing {filename}"
    icon_header = (release_dir / 'app-icon.png').read_bytes()[:64]
    assert b'CgBI' not in icon_header, 'app icon must be a browser-compatible PNG'

    with (release_dir / 'manifest.plist').open('rb') as file:
        manifest = plistlib.load(file)
    item = manifest['items'][0]
    assert item['assets'][0]['url'] == f"{BASE_URL}/emr.ipa"
    metadata = item['metadata']
    assert metadata['bundle-identifier'] == BUNDLE_ID
    assert metadata['bundle-version'] == VERSION
    assert metadata['title'] == 'Mobile EMR GBC Staging'


if __name__ == '__main__':
    main()
