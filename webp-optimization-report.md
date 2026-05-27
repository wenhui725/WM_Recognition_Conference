# WebP Optimization Report

- Run settings: WebP quality `80`; primary visuals max width `1600px`; other optimized photos max width `1200px`; enlargement disabled.
- Backup location: `img_original_webp_backup/` (`64` original WebP files).
- Total WebP size: `59.56 MiB` -> `8.46 MiB` (`85.8%` reduction).
- Initial images above `500 KiB`: `43`.
- Images still above `500 KiB`: `img/學習表揚/翡翠晉升.webp` (`531.9 KiB`, intentionally unchanged because it is neither referenced nor an activity photo).

## Initially Above 500 KiB

- `img/歷屆表揚/`: `00385.webp`, `02991.webp`, `0581.webp`, `0654.webp`, `0718.webp`, `2V1A2087.webp`
- `img/活動紀錄/`: `01.webp`, `02.webp`, `03.webp`, `101.webp`, `VIP.webp`, `VIP服務.webp`, `主持人.webp`, `公益表揚.webp`, `分紅.webp`, `台下_1.webp`, `台下合影_2.webp`, `台下合影_3.webp`, `台下合影_4.webp`, `台下合影_5.webp`, `團隊合影.webp`, `奉獻表揚_2.webp`, `學習團隊.webp`, `實境學習.webp`, `抽獎.webp`, `抽獎_2.webp`, `推薦.webp`, `數位.webp`, `服務奉獻.webp`, `機密.webp`, `激密_7.webp`, `珍珠授證_2.webp`, `珍珠授證_3.webp`, `珍珠表揚授證.webp`, `績效.webp`, `翡翠授證.webp`, `講師授證.webp`, `鑽石授證_4.webp`
- `img/學習表揚/`: `公益.webp`, `學習.webp`, `數位.webp`, `翡翠晉升.webp`
- `img/激密之星/`: `激密之星1920x1080_工作區域 1.webp`

## Optimized Images

| Image | Before | After | Reduction |
| --- | ---: | ---: | ---: |
| `img/11周年大會_主視覺_確認版-01.webp` | 343.8 KiB | 314.2 KiB | 8.6% |
| `img/劉美妏.webp` | 284.8 KiB | 250.6 KiB | 12.0% |
| `img/吳宛玲.webp` | 229.1 KiB | 204.6 KiB | 10.7% |
| `img/金希文.webp` | 238.3 KiB | 204.7 KiB | 14.1% |
| `img/學習表揚/101.webp` | 470.4 KiB | 156.3 KiB | 66.8% |
| `img/學習表揚/VIP.webp` | 484.0 KiB | 155.0 KiB | 68.0% |
| `img/學習表揚/公益.webp` | 569.4 KiB | 173.2 KiB | 69.6% |
| `img/學習表揚/學習.webp` | 569.4 KiB | 172.6 KiB | 69.7% |
| `img/學習表揚/年度最佳.webp` | 495.6 KiB | 148.6 KiB | 70.0% |
| `img/學習表揚/推薦.webp` | 496.1 KiB | 153.7 KiB | 69.0% |
| `img/學習表揚/數位.webp` | 578.9 KiB | 172.7 KiB | 70.2% |
| `img/學習表揚/績效.webp` | 491.0 KiB | 156.4 KiB | 68.1% |
| `img/歷屆表揚/00385.webp` | 2058.6 KiB | 143.9 KiB | 93.0% |
| `img/歷屆表揚/02991.webp` | 1756.7 KiB | 156.4 KiB | 91.1% |
| `img/歷屆表揚/0581.webp` | 1256.2 KiB | 121.8 KiB | 90.3% |
| `img/歷屆表揚/0654.webp` | 1237.5 KiB | 118.5 KiB | 90.4% |
| `img/歷屆表揚/0718.webp` | 1033.2 KiB | 111.6 KiB | 89.2% |
| `img/歷屆表揚/2V1A2087.webp` | 7310.4 KiB | 111.3 KiB | 98.5% |
| `img/活動紀錄/01.webp` | 866.4 KiB | 121.0 KiB | 86.0% |
| `img/活動紀錄/02.webp` | 778.3 KiB | 103.0 KiB | 86.8% |
| `img/活動紀錄/03.webp` | 799.0 KiB | 97.6 KiB | 87.8% |
| `img/活動紀錄/101.webp` | 829.2 KiB | 107.3 KiB | 87.1% |
| `img/活動紀錄/VIP.webp` | 671.3 KiB | 70.0 KiB | 89.6% |
| `img/活動紀錄/VIP服務.webp` | 774.4 KiB | 79.2 KiB | 89.8% |
| `img/活動紀錄/主持人.webp` | 654.1 KiB | 97.1 KiB | 85.2% |
| `img/活動紀錄/公益表揚.webp` | 804.8 KiB | 105.0 KiB | 87.0% |
| `img/活動紀錄/分紅.webp` | 1922.2 KiB | 162.6 KiB | 91.5% |
| `img/活動紀錄/台下_1.webp` | 861.2 KiB | 65.8 KiB | 92.4% |
| `img/活動紀錄/台下合影_2.webp` | 946.4 KiB | 98.0 KiB | 89.6% |
| `img/活動紀錄/台下合影_3.webp` | 1325.3 KiB | 155.4 KiB | 88.3% |
| `img/活動紀錄/台下合影_4.webp` | 1174.7 KiB | 76.6 KiB | 93.5% |
| `img/活動紀錄/台下合影_5.webp` | 1105.2 KiB | 98.7 KiB | 91.1% |
| `img/活動紀錄/團隊合影.webp` | 1600.6 KiB | 163.8 KiB | 89.8% |
| `img/活動紀錄/奉獻表揚_2.webp` | 1137.9 KiB | 120.3 KiB | 89.4% |
| `img/活動紀錄/學習團隊.webp` | 771.0 KiB | 82.0 KiB | 89.4% |
| `img/活動紀錄/實境學習.webp` | 714.7 KiB | 74.4 KiB | 89.6% |
| `img/活動紀錄/抽獎.webp` | 846.8 KiB | 111.9 KiB | 86.8% |
| `img/活動紀錄/抽獎_2.webp` | 869.2 KiB | 93.2 KiB | 89.3% |
| `img/活動紀錄/推薦.webp` | 775.4 KiB | 72.1 KiB | 90.7% |
| `img/活動紀錄/數位.webp` | 855.6 KiB | 76.3 KiB | 91.1% |
| `img/活動紀錄/服務奉獻.webp` | 1290.3 KiB | 122.5 KiB | 90.5% |
| `img/活動紀錄/機密.webp` | 913.8 KiB | 103.3 KiB | 88.7% |
| `img/活動紀錄/激密_7.webp` | 830.7 KiB | 110.4 KiB | 86.7% |
| `img/活動紀錄/珍珠授證_2.webp` | 762.7 KiB | 92.9 KiB | 87.8% |
| `img/活動紀錄/珍珠授證_3.webp` | 674.9 KiB | 83.6 KiB | 87.6% |
| `img/活動紀錄/珍珠表揚授證.webp` | 888.8 KiB | 113.1 KiB | 87.3% |
| `img/活動紀錄/績效.webp` | 821.1 KiB | 77.0 KiB | 90.6% |
| `img/活動紀錄/翡翠授證.webp` | 1529.5 KiB | 111.2 KiB | 92.7% |
| `img/活動紀錄/講師授證.webp` | 782.3 KiB | 107.0 KiB | 86.3% |
| `img/活動紀錄/鑽石團隊.webp` | 396.0 KiB | 44.2 KiB | 88.8% |
| `img/活動紀錄/鑽石授證_4.webp` | 618.1 KiB | 66.6 KiB | 89.2% |
| `img/激密之星/吳哲村1.webp` | 180.1 KiB | 54.8 KiB | 69.6% |
| `img/激密之星/應海珠1.webp` | 483.9 KiB | 121.5 KiB | 74.9% |
| `img/激密之星/林愛呈1.webp` | 355.9 KiB | 97.0 KiB | 72.7% |
| `img/激密之星/楊玉華1.webp` | 297.7 KiB | 72.9 KiB | 75.5% |
| `img/激密之星/激密之星1920x1080_工作區域 1.webp` | 5213.0 KiB | 191.0 KiB | 96.3% |
| `img/激密之星/王羿淇1.webp` | 363.0 KiB | 121.1 KiB | 66.6% |
| `img/激密之星/葉招治1.webp` | 391.3 KiB | 96.7 KiB | 75.3% |
| `img/激密之星/蘇榮華1.webp` | 421.3 KiB | 72.7 KiB | 82.7% |
| `img/激密之星/邱聖淵1.webp` | 454.6 KiB | 116.7 KiB | 74.3% |
| `img/激密之星/阮詩翃1.webp` | 311.6 KiB | 92.9 KiB | 70.2% |
| `img/激密之星/陳聰碧1.webp` | 423.5 KiB | 112.1 KiB | 73.5% |
| `img/激密之星/陳諭葳1.webp` | 142.9 KiB | 61.1 KiB | 57.2% |
| `img/激密之星/黃孟蓁1.webp` | 360.4 KiB | 67.5 KiB | 81.3% |
