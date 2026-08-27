# -*- coding: utf-8 -*-
"""从线上下载视频文件"""
import sys, os
try:
    sys.stdout.reconfigure(encoding='utf-8')
except:
    pass

from urllib.request import urlretrieve

BASE_URL = 'https://wedding-d0g9f08ef08edda87-1463619786.tcloudbaseapp.com/assets/'
OUTPUT_DIR = r'C:\Users\Administrator\.qclaw\workspace\wedding-optimized\assets'

os.makedirs(OUTPUT_DIR, exist_ok=True)

videos = ['start.mp4', 'select.mp4', 'map.mp4', 'thanks.mp4']

for video in videos:
    url = BASE_URL + video
    output = os.path.join(OUTPUT_DIR, video)
    print(f'Downloading {video}...')
    try:
        urlretrieve(url, output)
        size = os.path.getsize(output) / 1024 / 1024
        print(f'  Done: {size:.2f} MB')
    except Exception as e:
        print(f'  Failed: {e}')

print('\nAll videos downloaded!')