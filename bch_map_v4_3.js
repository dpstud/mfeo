const PASS='camper';
let night='fri';
let db={fri:{},sat:{}};
let myName=localStorage.getItem('bch_name')||'';

const ZONES=[
  ['orchestra_1',   'Orchestra 1',      40,    34.32,  7.8,  8.27],
  ['orchestra_2',   'Orchestra 2',      27,    37.94, 11.6,  7.36],
  ['orchestra_3',   'Orchestra 3',       9.5,  43.37, 14.7,  7.49],
  ['dress_circle_1','Dress Circle 1',   55.6,  49.31, 11.6,  6.72],
  ['dress_circle_2','Dress Circle 2',   40,    16.41, 12.4,  6.71],
  ['mezzanine_5',   'Mezzanine 5',      18,    73.86, 12,    8.01],
  ['mezzanine_4',   'Mezzanine 4',      45.3,  63,    10,    7.5 ],
  ['mezzanine_3',   'Mezzanine 3',      83.8,  59.64, 10.2,  7.5 ],
  ['mezzanine_2',   'Mezzanine 2',      75.4,  41.3,   9.8,  6.97],
  ['mezzanine_6',   'Mezzanine 6',       8.2,  11.93, 11,    8.27],
  ['mezzanine_7',   'Mezzanine 7',      25.9,  12.87,  9.3,  7.5 ],
  ['mezzanine_8',   'Mezzanine 8',      47.2,   7.28,  9.1,  6.71],
  ['parquet',       'Parquet',          61.2,  21.75,  8.4,  9.17],
  ['mezzanine_1',   'Mezzanine 1',      70.9,  15.03,  8.8,  7.49],
];  // ring_4 and ring_2 removed — handled as buttons below map

const SD={"orchestra_1": {"label": "Orchestra 1", "type": "4block", "rows": [{"row": "A", "b4": [61, 60], "b3": [46, 45, 44, 43, 42, 41, 40], "b2": [26, 25, 24, 23, 22, 21, 20], "b1": [19, 18, 17, 16]}, {"row": "B", "b4": [63, 62, 61, 60], "b3": [47, 46, 45, 44, 43, 42, 41, 40], "b2": [27, 26, 25, 24, 23, 22, 21, 20], "b1": [19, 18, 17, 16, 15]}, {"row": "C", "b4": [65, 64, 63, 62, 61, 60], "b3": [49, 48, 47, 46, 45, 44, 43, 42, 41, 40], "b2": [29, 28, 27, 26, 25, 24, 23, 22, 21, 20], "b1": [19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4]}, {"row": "D", "b4": [67, 66, 65, 64, 63, 62, 61, 60], "b3": [50, 49, 48, 47, 46, 45, 44, 43, 42, 41, 40], "b2": [30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20], "b1": [19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7]}, {"row": "E", "b4": [69, 68, 67, 66, 65, 64, 63, 62, 61, 60], "b3": [50, 49, 48, 47, 46, 45, 44, 43, 42, 41, 40], "b2": [30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20], "b1": [19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9]}, {"row": "F", "b4": [70, 69, 68, 67, 66, 65, 64, 63, 62, 61, 60], "b3": [51, 50, 49, 48, 47, 46, 45, 44, 43, 42, 41, 40], "b2": [31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20], "b1": [19, 18, 17, 16, 15, 14, 13, 12, 11, 10]}, {"row": "G", "b4": [71, 70, 69, 68, 67, 66, 65, 64, 63, 62, 61, 60], "b3": [52, 51, 50, 49, 48, 47, 46, 45, 44, 43, 42, 41, 40], "b2": [32, 31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20], "b1": [19, 18, 17, 16, 15, 14, 13, 12, 11]}, {"row": "H", "b4": [72, 71, 70, 69, 68, 67, 66, 65, 64, 63, 62, 61, 60], "b3": [53, 52, 51, 50, 49, 48, 47, 46, 45, 44, 43, 42, 41, 40], "b2": [33, 32, 31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20], "b1": [19, 18, 17, 16, 15, 14, 13]}]}, "orchestra_2": {"label": "Orchestra 2", "type": "4block", "rows": [{"row": "J", "b4": [68, 67, 66, 65, 64, 63, 62, 61, 60], "b3": [49, 48, 47, 46, 45, 44, 43, 42, 41, 40], "b2": [29, 28, 27, 26, 25, 24, 23, 22, 21, 20], "b1": [19, 18, 17, 16, 15, 14, 13, 12]}, {"row": "K", "b4": [71, 70, 69, 68, 67, 66, 65, 64, 63, 62, 61, 60], "b3": [50, 49, 48, 47, 46, 45, 44, 43, 42, 41, 40], "b2": [30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20], "b1": [19, 18, 17, 16, 15, 14, 13]}, {"row": "L", "b4": [72, 71, 70, 69, 68, 67, 66, 65, 64, 63, 62, 61, 60], "b3": [50, 49, 48, 47, 46, 45, 44, 43, 42, 41, 40], "b2": [30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20], "b1": [19, 18, 17, 16, 15, 14]}, {"row": "M", "b4": [74, 73, 72, 71, 70, 69, 68, 67, 66, 65, 64, 63, 62, 61, 60], "b3": [51, 50, 49, 48, 47, 46, 45, 44, 43, 42, 41, 40], "b2": [31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20], "b1": [19, 18, 17, 16, 15]}, {"row": "N", "b4": [71, 70, 69, 68, 67, 66, 65, 64, 63, 62, 61, 60], "b3": [51, 50, 49, 48, 47, 46, 45, 44, 43, 42, 41, 40], "b2": [31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20], "b1": [19, 18, 17, 16]}, {"row": "O", "b4": [71, 70, 69, 68, 67, 66, 65, 64, 63, 62, 61, 60], "b3": [52, 51, 50, 49, 48, 47, 46, 45, 44, 43, 42, 41, 40], "b2": [31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20], "b1": [19, 18, 17]}, {"row": "P", "b4": [72, 71, 70, 69, 68, 67, 66, 65, 64, 63, 62, 61, 60], "b3": [52, 51, 50, 49, 48, 47, 46, 45, 44, 43, 42, 41, 40], "b2": [32, 31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20], "b1": [19, 18]}, {"row": "Q", "b4": [67, 66, 65, 64, 63, 62, 61, 60], "b3": [52, 51, 50, 49, 48, 47, 46, 45, 44, 43, 42, 41, 40], "b2": [32, 31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20], "b1": [19]}, {"row": "R", "b4": [68, 67, 66, 65, 64, 63, 62, 61, 60], "b3": [53, 52, 51, 50, 49, 48, 47, 46, 45, 44, 43, 42, 41, 40], "b2": [33, 32, 31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20], "b1": []}]}, "orchestra_3": {"label": "Orchestra 3", "type": "3block", "rows": [{"row": "RR", "b1": [20, 21, 22, 23, 24, 25, 26, 27], "b2": [40, 41, 42, 43, 44, 45, 46, 47], "b3": [60, 61, 62, 63, 64, 65, 66, 67]}, {"row": "S", "b1": [20, 21, 22, 23, 24, 25, 26, 27, 28, 29], "b2": [40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51], "b3": [60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71]}, {"row": "T", "b1": [20, 21, 22, 23, 24, 25, 26, 27, 28], "b2": [40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51], "b3": [60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73]}, {"row": "U", "b1": [20, 21, 22, 23, 24, 25, 26, 27], "b2": [40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51], "b3": [60, 61, 62, 63, 64, 65, 66, 67]}, {"row": "V", "b1": [20, 21, 22, 23, 24, 25, 26], "b2": [40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52], "b3": [60, 61, 62, 63, 64, 65]}, {"row": "W", "b1": [20, 21, 22, 23, 24, 25], "b2": [40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52], "b3": [60, 61, 62, 63, 64, 65]}, {"row": "X", "b1": [20, 21, 22, 23, 24], "b2": [40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53], "b3": [60, 61, 62, 63, 64, 65, 66]}, {"row": "Y", "b1": [20, 21, 22, 23, 24, 25], "b2": [40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51], "b3": [60, 61, 62, 63, 64, 65, 66]}]}, "dress_circle_1": {"label": "Dress Circle 1", "type": "dc", "rows": [{"row": "E", "b1": [2, 3, 4, 5, 6], "b2": [], "b3": [30, 31, 32, 33, 34, 35]}, {"row": "D", "b1": [2, 3, 4, 5, 6], "b2": [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30], "b3": [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]}, {"row": "C", "b1": [3, 4, 5, 6], "b2": [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30], "b3": [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35]}, {"row": "B", "b1": [4, 5, 6], "b2": [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30], "b3": [24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35]}, {"row": "A", "b1": [4, 5, 6], "b2": [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30], "b3": [23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35]}]}, "dress_circle_2": {"label": "Dress Circle 2", "type": "dc2", "rows": [{"row": "F", "b1": [4, 5, 6, 7, 8, 9, 10], "b2": [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22], "b3": [30, 31, 32, 33, 34, 35]}, {"row": "G", "b1": [4, 5, 6, 7, 8, 9, 10], "b2": [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23], "b3": [30, 31, 32, 33, 34, 35, 36]}, {"row": "H", "b1": [3, 4, 5, 6, 7, 8, 9, 10], "b2": [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24], "b3": [30, 31, 32, 33, 34, 35, 36]}, {"row": "I", "b1": [3, 4, 5, 6, 7, 8, 9, 10], "b2": [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25], "b3": [30, 31, 32, 33, 34, 35, 36]}, {"row": "J", "b1": [2, 3, 4, 5, 6, 7, 8, 9], "b2": [], "b3": [30, 31, 32, 33, 34, 35, 36]}]}, "parquet": {"label": "Parquet", "type": "parquet", "rows": [{"row": "A", "b1": [14, 15, 16, 17, 18, 19], "b2": [20, 21, 22, 23, 24, 25], "b3": [40, 41, 42, 43, 44, 45]}, {"row": "B", "b1": [14, 15, 16, 17, 18, 19], "b2": [20, 21, 22, 23, 24, 25], "b3": [40, 41, 42, 43, 44, 45]}, {"row": "C", "b1": [11, 12, 13, 14, 15, 16, 17, 18, 19], "b2": [20, 21, 22, 23, 24, 25, 26, 27, 28], "b3": [40, 41, 42, 43, 44, 45]}, {"row": "D", "b1": [11, 12, 13, 14, 15, 16, 17, 18, 19], "b2": [20, 21, 22, 23, 24, 25, 26, 27, 28], "b3": [40, 41, 42, 43, 44, 45, 46, 47, 48]}, {"row": "E", "b1": [11, 12, 13, 14, 15, 16, 17, 18, 19], "b2": [20, 21, 22, 23, 24, 25, 26, 27, 28], "b3": [40, 41, 42, 43, 44, 45, 46, 47, 48]}, {"row": "F", "b1": [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], "b2": [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31], "b3": [40, 41, 42, 43, 44, 45, 46, 47, 48]}]}, "mezzanine_1": {"label": "Mezzanine 1", "type": "mezz1", "rows": [{"row": "G", "b1": [], "b2": [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34], "b3": [], "b4": []}, {"row": "H", "b1": [13, 14, 15, 16, 17, 18, 19], "b2": [20, 21, 22, 23, 24], "b3": [26, 27, 28, 29, 30, 31, 32, 33, 34], "b4": [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46]}, {"row": "I", "b1": [13, 14, 15, 16, 17, 18, 19], "b2": [20, 21, 22, 23, 24], "b3": [27, 28, 29, 30, 31, 32, 33, 34], "b4": [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46]}, {"row": "J", "b1": [12, 13, 14, 15, 16, 17, 18, 19], "b2": [20, 21, 22, 23, 24], "b3": [26, 27, 28, 29, 30, 31, 32, 33, 34], "b4": [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47]}, {"row": "K", "b1": [12, 13, 14, 15, 16, 17, 18, 19], "b2": [20, 21, 22, 23, 24, 25], "b3": [26, 27, 28, 29, 30, 31, 32, 33, 34], "b4": [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47]}, {"row": "L", "b1": [11, 12, 13, 14, 15, 16, 17, 18, 19], "b2": [20, 21, 22, 23, 24, 25], "b3": [26, 27, 28, 29, 30, 31, 32, 33, 34], "b4": [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48]}]}, "ring_4": {"label": "Rings 3 & 4", "type": "simple", "rows": [{"row": "Ring 4", "seats": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87]}, {"row": "Ring 3", "seats": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81]}]}, "ring_3": {"label": "Ring 3", "type": "simple", "rows": [{"row": "Ring 3", "seats": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81]}]}, "ring_2": {"label": "Rings 1 & 2", "type": "simple", "rows": [{"row": "Ring 2", "seats": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58]}, {"row": "Ring 1", "seats": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50]}]}, "ring_1": {"label": "Ring 1", "type": "simple", "rows": [{"row": "Ring 1", "seats": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50]}]}, "mezzanine_5": {"label": "Mezzanine 5", "type": "3block", "rows": [{"row": "K", "b1": [3, 4, 5, 6], "b2": [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23], "b3": [30, 31, 32, 33, 34, 35, 36]}, {"row": "L", "b1": [3, 4, 5, 6], "b2": [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24], "b3": [30, 31, 32, 33, 34, 35, 36]}, {"row": "M", "b1": [3, 4, 5, 6], "b2": [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24], "b3": [30, 31, 32, 33, 34, 35, 36]}, {"row": "N", "b1": [2, 3, 4, 5, 6], "b2": [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25], "b3": [30, 31, 32, 33, 34, 35, 36, 37]}, {"row": "O", "b1": [2, 3, 4, 5, 6], "b2": [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25], "b3": [30, 31, 32, 33, 34, 35, 36, 37]}, {"row": "P", "b1": [6, 7, 8, 9], "b2": [10, 11, 12, 13, 14, 15], "b3": [30, 31, 32, 33, 34, 35, 36, 37]}]}, "mezzanine_4": {"label": "Mezzanine 4", "type": "3block", "rows": [{"row": "F", "b1": [4, 5, 6], "b2": [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23], "b3": [30, 31, 32, 33, 34, 35]}, {"row": "G", "b1": [3, 4, 5, 6], "b2": [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23], "b3": [30, 31, 32, 33, 34, 35, 36]}, {"row": "H", "b1": [3, 4, 5, 6], "b2": [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24], "b3": [30, 31, 32, 33, 34, 35, 36]}, {"row": "I", "b1": [2, 3, 4, 5, 6], "b2": [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25], "b3": [30, 31, 32, 33, 34, 35, 36, 37]}, {"row": "J", "b1": [2, 3, 4, 5, 6], "b2": [10, 11, 12, 13, 14, 15], "b3": [30, 31, 32, 33, 34, 35, 36, 37]}]}, "mezzanine_6": {"label": "Mezzanine 6", "type": "3block", "rows": [{"row": "P", "b1": [3, 4, 5, 6, 7, 8, 9], "b2": [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24], "b3": [30, 31, 32, 33, 34, 35]}, {"row": "Q", "b1": [3, 4, 5, 6, 7, 8, 9], "b2": [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25], "b3": [30, 31, 32, 33, 34, 35, 36]}, {"row": "R", "b1": [3, 4, 5, 6, 7, 8, 9], "b2": [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25], "b3": [30, 31, 32, 33, 34, 35, 36]}, {"row": "S", "b1": [2, 3, 4, 5, 6, 7, 8, 9], "b2": [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25], "b3": [30, 31, 32, 33, 34, 35, 36]}, {"row": "T", "b1": [], "b2": [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26], "b3": [30, 31, 32, 33, 34]}]}, "mezzanine_7": {"label": "Mezzanine 7", "type": "3block", "rows": [{"row": "K", "b1": [40, 41, 42, 43, 44, 45, 46], "b2": [50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63], "b3": [70, 71, 72, 73, 74, 75, 76]}, {"row": "L", "b1": [40, 41, 42, 43, 44, 45, 46, 47], "b2": [50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63], "b3": [70, 71, 72, 73, 74, 75, 76]}, {"row": "M", "b1": [40, 41, 42, 43, 44, 45, 46, 47], "b2": [50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64], "b3": [70, 71, 72, 73, 74, 75, 76]}, {"row": "N", "b1": [40, 41, 42, 43, 44, 45, 46, 47], "b2": [50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64], "b3": [70, 71, 72, 73, 74, 75, 76, 77]}, {"row": "O", "b1": [44, 45, 46, 47], "b2": [50, 51, 52, 53], "b3": [70, 71, 72, 73, 74, 75, 76, 77]}]}, "mezzanine_8": {"label": "Mezzanine 8", "type": "3block", "rows": [{"row": "K", "b1": [4, 5, 6, 7, 8, 9], "b2": [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22], "b3": [30, 31, 32, 33, 34, 35]}, {"row": "L", "b1": [3, 4, 5, 6, 7, 8, 9], "b2": [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23], "b3": [30, 31, 32, 33, 34, 35]}, {"row": "M", "b1": [3, 4, 5, 6, 7, 8, 9], "b2": [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23], "b3": [30, 31, 32, 33, 34, 35]}, {"row": "N", "b1": [3, 4, 5, 6, 7, 8, 9], "b2": [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24], "b3": [30, 31, 32, 33, 34, 35, 36]}, {"row": "O", "b1": [2, 3, 4, 5, 6, 7, 8, 9], "b2": [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25], "b3": [30, 31, 32, 33, 34, 35, 36, 37]}, {"row": "P", "b1": [2, 3, 4, 5, 6, 7, 8, 9], "b2": [10, 11, 12, 13, 14, 15, 16, 17, 18], "b3": [24, 25]}]}, "mezzanine_2": {"label": "Mezzanine 2", "type": "3block", "rows": [{"row": "G", "b1": [4, 5, 6, 7, 8, 9], "b2": [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22], "b3": [30, 31, 32, 33, 34, 35]}, {"row": "H", "b1": [4, 5, 6, 7, 8, 9], "b2": [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23], "b3": [30, 31, 32, 33, 34, 35]}, {"row": "I", "b1": [3, 4, 5, 6, 7, 8, 9], "b2": [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23], "b3": [30, 31, 32, 33, 34, 35, 36]}, {"row": "J", "b1": [3, 4, 5, 6, 7, 8, 9], "b2": [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23], "b3": [30, 31, 32, 33, 34, 35, 36]}, {"row": "K", "b1": [3, 4, 5, 6, 7, 8, 9], "b2": [20, 21, 22, 23], "b3": [30, 31, 32, 33, 34, 35, 36]}]}, "mezzanine_3": {"label": "Mezzanine 3", "type": "3block", "rows": [{"row": "L", "b1": [3, 4, 5, 6, 7, 8, 9], "b2": [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23], "b3": [30, 31, 32, 33, 34, 35, 36]}, {"row": "M", "b1": [3, 4, 5, 6, 7, 8, 9], "b2": [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24], "b3": [30, 31, 32, 33, 34, 35, 36]}, {"row": "N", "b1": [3, 4, 5, 6, 7, 8, 9], "b2": [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24], "b3": [30, 31, 32, 33, 34, 35, 36]}, {"row": "O", "b1": [2, 3, 4, 5, 6, 7, 8, 9], "b2": [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24], "b3": [30, 31, 32, 33, 34, 35, 36, 37]}, {"row": "P", "b1": [3, 4, 5, 6, 7, 8, 9], "b2": [], "b3": []}]}};

const GENERIC_HINTS={
  mezzanine_2:'Lower left section.',
  mezzanine_3:'Outer left section.',
};

async function doLogin(){
  if(document.getElementById('pw-input').value===PASS){
    document.getElementById('login-screen').style.display='none';
    document.getElementById('main-screen').style.display='block';
    await loadAll();
  } else {document.getElementById('pw-err').textContent='Incorrect password.';}
}
document.getElementById('pw-input').addEventListener('keydown',e=>{if(e.key==='Enter')doLogin();});

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUqPas0MR2e0wBOTFyjcoCQUcJg0bd4v4",
  authDomain: "mfeo-concerts.firebaseapp.com",
  databaseURL: "https://mfeo-concerts-default-rtdb.firebaseio.com",
  projectId: "mfeo-concerts",
  storageBucket: "mfeo-concerts.firebasestorage.app",
  messagingSenderId: "203577706094",
  appId: "1:203577706094:web:d03747e1122fa600e3887f"
};

// Initialize Firebase
let firebaseApp, database;
try {
  firebaseApp = firebase.initializeApp(firebaseConfig);
  database = firebase.database();
  console.log('Firebase initialized successfully');
} catch (error) {
  console.error('Firebase initialization error:', error);
}

async function storageGet(key){
  if (!database) {
    // Fallback to localStorage if Firebase fails
    return localStorage.getItem(key) || null;
  }
  try {
    const snapshot = await database.ref(key).once('value');
    return snapshot.val();
  } catch (error) {
    console.error('Firebase get error:', error);
    return localStorage.getItem(key) || null;
  }
}
async function storageSet(key,val){
  // Always save to localStorage as backup
  localStorage.setItem(key,val);
  
  if (!database) return;
  
  try {
    await database.ref(key).set(val);
  } catch (error) {
    console.error('Firebase set error:', error);
  }
}

// Listen for real-time updates from other users
function setupRealtimeSync() {
  if (!database) return;
  
  for (const n of ['fri', 'sat']) {
    database.ref('bch_v2_' + n).on('value', (snapshot) => {
      const val = snapshot.val();
      if (val) {
        try {
          db[n] = JSON.parse(val);
          renderAll();
        } catch (e) {
          console.error('Error parsing Firebase data:', e);
        }
      }
    });
  }
}
async function loadAll(){
  for(const n of['fri','sat']){
    try{const r=await storageGet('bch_v2_'+n);db[n]=r?JSON.parse(r):{};}
    catch{db[n]={};}
  }
  // Migrate old orchestra_rr claims to orchestra_3 (Row RR is now part of Orchestra 3)
  for(const n of['fri','sat']){
    if(db[n]){
      const toMigrate=[];
      for(const key of Object.keys(db[n])){
        if(key.startsWith('orchestra_rr:')){
          const newKey=key.replace('orchestra_rr:','orchestra_3:');
          toMigrate.push({old:key,new:newKey,who:db[n][key]});
        }
      }
      if(toMigrate.length>0){
        toMigrate.forEach(m=>{
          db[n][m.new]=m.who;
          delete db[n][m.old];
        });
        await storageSet('bch_v2_'+n,JSON.stringify(db[n]));
      }
    }
  }
  // Clean up invalid Orchestra 3 claims (seat structure changed)
  const validOrch3Seats=new Set();
  if(SD.orchestra_3){
    SD.orchestra_3.rows.forEach(rowObj=>{
      const row=rowObj.row;
      ['b1','b2','b3'].forEach(block=>{
        if(rowObj[block]){
          rowObj[block].forEach(seat=>{
            validOrch3Seats.add(`orchestra_3:${row}-${seat}`);
          });
        }
      });
    });
  }
  for(const n of['fri','sat']){
    if(db[n]){
      const toDelete=[];
      for(const key of Object.keys(db[n])){
        if(key.startsWith('orchestra_3:')&&!validOrch3Seats.has(key)){
          toDelete.push(key);
        }
      }
      if(toDelete.length>0){
        toDelete.forEach(k=>delete db[n][k]);
        await storageSet('bch_v2_'+n,JSON.stringify(db[n]));
      }
    }
  }
  renderAll();
  // Set up real-time sync with Firebase
  setupRealtimeSync();
}

function setNight(n){
  night=n;
  document.getElementById('btn-fri').classList.toggle('active',n==='fri');
  document.getElementById('btn-sat').classList.toggle('active',n==='sat');
  renderAll();
  const panel=document.getElementById('seat-panel');
  if(panel.classList.contains('open')&&panel.dataset.zid) openPanel(panel.dataset.zid,(ZONES.find(z=>z[0]===panel.dataset.zid)||[,''])[1]);
}

function buildZones(){
  const wrap=document.getElementById('map-outer');
  wrap.querySelectorAll('.zone').forEach(z=>z.remove());
  ZONES.forEach(([id,label,l,t,w,h])=>{
    const z=document.createElement('div');
    z.className='zone';z.id='z-'+id;
    z.style.cssText=`left:${l}%;top:${t}%;width:${w}%;height:${h}%;`;
    z.onclick=()=>openPanel(id,label);
    const tip=document.createElement('div');tip.className='tip';tip.id='tip-'+id;
    z.appendChild(tip);wrap.appendChild(z);
  });
  renderAll();
}

function renderAll(){
  const cur=db[night]||{};
  const counts={},pnames={};
  for(const[k,v]of Object.entries(cur)){
    const zid=k.split(':')[0];
    counts[zid]=(counts[zid]||0)+1;
    if(!pnames[zid])pnames[zid]=[];
    if(!pnames[zid].includes(v))pnames[zid].push(v);
  }
  ZONES.forEach(([id,label])=>{
    const z=document.getElementById('z-'+id);
    const tip=document.getElementById('tip-'+id);
    if(!z)return;
    const n=counts[id]||0;
    z.classList.toggle('claimed',n>0);
    if(n>0){
      const pp=(pnames[id]||[]).slice(0,4).join(', ');
      const more=(pnames[id]||[]).length>4?` +${(pnames[id]||[]).length-4} more`:'';
      tip.textContent=`${label} · ${n} seat${n!==1?'s':''} · ${pp}${more}`;
    } else {
      tip.textContent=`${label} · Click to select seats`;
    }
  });
  const tot=Object.keys(cur).length;
  document.getElementById('status-bar').textContent=`${night==='fri'?'Friday':'Saturday'} night — ${tot} seat${tot!==1?'s':''} claimed`;
  renderRoster();
  // Update ring section buttons
  for(const rid of ['ring_4','ring_2']){
    const btn=document.getElementById('ring-btn-'+rid);
    if(!btn)continue;
    const n=counts[rid]||0;
    btn.classList.toggle('ring-btn-claimed',n>0);
    const lbl=rid==='ring_4'?'Rings 3 & 4':'Rings 1 & 2';
    btn.querySelector('.ring-btn-label').textContent=lbl;
    const badge=btn.querySelector('.ring-btn-badge');
    if(n>0){badge.textContent=n+' seat'+(n!==1?'s':'');badge.style.display='';}
    else{badge.style.display='none';}
  }
}

function seatBtn(zid,row,seat){
  const key=`${zid}:${row}-${seat}`;
  const cur=db[night]||{};
  const who=cur[key];
  const cls=who?(who===myName?'seat-btn mine':'seat-btn taken'):'seat-btn';
  const tipText=who?who:`Row ${row}, Seat ${seat}`;
  return `<button class="${cls}" onclick="handleSeat('${zid}','${row}',${seat})">${seat}<span class="stip">${tipText}</span></button>`;
}

function seatBtnWithLabel(zid,row,seat){
  const key=`${zid}:${row}-${seat}`;
  const cur=db[night]||{};
  const who=cur[key];
  const cls=who?(who===myName?'seat-btn mine':'seat-btn taken'):'seat-btn';
  const tipText=who?who:`Row ${row}, Seat ${seat}`;
  let labelHtml='';
  if(who){
    const labelCls=who===myName?'seat-label-zoom mine':'seat-label-zoom claimed';
    const initials=who.split(' ').map(n=>n[0]).join('');
    labelHtml=`<span class="${labelCls}"><span class="initials">${initials}</span><span class="fullname">${who}</span></span>`;
  }
  return `<button class="${cls}" onclick="handleSeat('${zid}','${row}',${seat})">${labelHtml}${seat}<span class="stip">${tipText}</span></button>`;
}

function openPanel(zid,label){
  const panel=document.getElementById('seat-panel');
  panel.dataset.zid=zid;
  document.getElementById('sp-title').textContent=label;
  document.getElementById('sp-sub').textContent=(night==='fri'?'Friday':'Saturday')+' night · click a seat to claim';
  zoomState.scale=1;zoomState.translateX=0;zoomState.translateY=0;zoomState.mode='view';setViewMode('view');enableZoom(zid);
  if(!SD[zid]){ renderGenericPanel(zid); }
  else {
    const t=SD[zid].type;
    if(t==='simple') renderSimplePanel(zid);
    else if(t==='dc') renderDCPanel(zid,false);
    else if(t==='dc2') renderDCPanel(zid,true);
    else if(t==='3block') render3BlockPanel(zid);
    else if(t==='parquet') renderParquetPanel(zid);
    else if(t==='mezz1') renderMezz1Panel(zid);
    else renderDetailPanel(zid);
  }
  document.body.style.overflow='hidden';
  panel.classList.add('open');
  if('vibrate' in navigator){navigator.vibrate(10);}
}

function closePanel(){
  const panel=document.getElementById('seat-panel');
  const inner=panel.querySelector('.sp-inner');
  // Slide down animation before closing
  if(inner)inner.style.transform='translateY(20px)';
  setTimeout(()=>{
    panel.classList.remove('open');
    document.body.style.overflow=''; // Re-enable body scroll
  },150);
}
document.getElementById('seat-panel').addEventListener('click',e=>{
  if(e.target===document.getElementById('seat-panel'))closePanel();
});

// ZOOM FUNCTIONALITY FOR ORCHESTRA 2
let zoomState={enabled:false,mode:'view',scale:1,translateX:0,translateY:0,isDragging:false,startX:0,startY:0,initialPinchDistance:0,initialScale:1,initialTranslateX:0,initialTranslateY:0,pinchCenterX:0,pinchCenterY:0};
function enableZoom(zid){
  const zoomSections=[
    'orchestra_1','orchestra_2','orchestra_3',
    'dress_circle_1','dress_circle_2',
    'parquet','mezzanine_1',
    'mezzanine_2','mezzanine_3','mezzanine_4','mezzanine_5',
    'mezzanine_6','mezzanine_7','mezzanine_8',
    'ring_2','ring_4'
  ];
  if(zoomSections.includes(zid)){
    zoomState.enabled=true;
    document.getElementById('zoom-controls').classList.add('active');
    initZoomListeners();
  }else{
    zoomState.enabled=false;
    document.getElementById('zoom-controls').classList.remove('active');
  }
}
function setViewMode(mode){zoomState.mode=mode;const body=document.getElementById('sp-body');const viewBtn=document.getElementById('view-mode-btn');const claimBtn=document.getElementById('claim-mode-btn');if(mode==='view'){body.classList.remove('claim-mode');body.classList.add('view-mode');viewBtn.classList.add('active');claimBtn.classList.remove('active');}else{body.classList.remove('view-mode');body.classList.add('claim-mode');viewBtn.classList.remove('active');claimBtn.classList.add('active');}}
function updateZoomTransform(){const container=document.querySelector('.seat-container');if(!container)return;container.style.transform=`translate(${zoomState.translateX}px, ${zoomState.translateY}px) scale(${zoomState.scale})`;let zoomLevel='low';if(zoomState.scale>=2.5)zoomLevel='high';else if(zoomState.scale>=1.5)zoomLevel='medium';container.dataset.zoom=zoomLevel;}
function zoomIn(){const body=document.getElementById('sp-body');const rect=body.getBoundingClientRect();const centerX=rect.width/2;const centerY=rect.height/2;const oldScale=zoomState.scale;zoomState.scale=Math.min(zoomState.scale+0.3,3.5);const scaleRatio=zoomState.scale/oldScale;zoomState.translateX=centerX-(centerX-zoomState.translateX)*scaleRatio;zoomState.translateY=centerY-(centerY-zoomState.translateY)*scaleRatio;updateZoomTransform();}
function zoomOut(){const body=document.getElementById('sp-body');const rect=body.getBoundingClientRect();const centerX=rect.width/2;const centerY=rect.height/2;const oldScale=zoomState.scale;zoomState.scale=Math.max(zoomState.scale-0.3,1);const scaleRatio=zoomState.scale/oldScale;zoomState.translateX=centerX-(centerX-zoomState.translateX)*scaleRatio;zoomState.translateY=centerY-(centerY-zoomState.translateY)*scaleRatio;updateZoomTransform();}
function zoomReset(){zoomState.scale=1;zoomState.translateX=0;zoomState.translateY=0;updateZoomTransform();}
let zoomListenersAdded=false;
function initZoomListeners(){
  if(zoomListenersAdded)return;
  zoomListenersAdded=true;
  const body=document.getElementById('sp-body');
  
  // Mouse drag
  body.addEventListener('mousedown',e=>{
    if(!zoomState.enabled||zoomState.mode!=='view')return;
    zoomState.isDragging=true;
    body.classList.add('dragging');
    zoomState.startX=e.clientX-zoomState.translateX;
    zoomState.startY=e.clientY-zoomState.translateY;
    e.preventDefault();
  });
  body.addEventListener('mousemove',e=>{
    if(!zoomState.isDragging||zoomState.mode!=='view')return;
    zoomState.translateX=e.clientX-zoomState.startX;
    zoomState.translateY=e.clientY-zoomState.startY;
    updateZoomTransform();
  });
  body.addEventListener('mouseup',()=>{
    zoomState.isDragging=false;
    body.classList.remove('dragging');
  });
  body.addEventListener('mouseleave',()=>{
    zoomState.isDragging=false;
    body.classList.remove('dragging');
  });
  
  // Wheel/trackpad zoom and pan
  body.addEventListener('wheel',e=>{
    if(!zoomState.enabled||zoomState.mode!=='view')return;
    e.preventDefault();
    
    const rect=body.getBoundingClientRect();
    const mouseX=e.clientX-rect.left;
    const mouseY=e.clientY-rect.top;
    
    // Detect pinch-zoom (ctrlKey/metaKey) - zoom operation
    if(e.ctrlKey||e.metaKey){
      const oldScale=zoomState.scale;
      const delta=-e.deltaY*0.01;
      zoomState.scale=Math.min(Math.max(zoomState.scale+delta,1),3.5);
      
      // Zoom toward mouse position
      const scaleRatio=zoomState.scale/oldScale;
      zoomState.translateX=mouseX-(mouseX-zoomState.translateX)*scaleRatio;
      zoomState.translateY=mouseY-(mouseY-zoomState.translateY)*scaleRatio;
    }
    // Two-finger trackpad scroll (has both deltaX and deltaY) - pan operation
    else if(Math.abs(e.deltaX)>0||Math.abs(e.deltaY)>0){
      // Pan the view
      zoomState.translateX-=e.deltaX;
      zoomState.translateY-=e.deltaY;
    }
    
    updateZoomTransform();
  },{passive:false});
  
  // Touch gestures
  body.addEventListener('touchstart',e=>{
    if(!zoomState.enabled||zoomState.mode!=='view')return;
    if(e.touches.length===2){
      e.preventDefault();
      const dx=e.touches[1].clientX-e.touches[0].clientX;
      const dy=e.touches[1].clientY-e.touches[0].clientY;
      zoomState.initialPinchDistance=Math.sqrt(dx*dx+dy*dy);
      zoomState.initialScale=zoomState.scale;
      zoomState.initialTranslateX=zoomState.translateX;
      zoomState.initialTranslateY=zoomState.translateY;
      const rect=body.getBoundingClientRect();
      zoomState.pinchCenterX=((e.touches[0].clientX+e.touches[1].clientX)/2)-rect.left;
      zoomState.pinchCenterY=((e.touches[0].clientY+e.touches[1].clientY)/2)-rect.top;
      zoomState.isDragging=false;
    }else if(e.touches.length===1){
      const touch=e.touches[0];
      zoomState.startX=touch.clientX-zoomState.translateX;
      zoomState.startY=touch.clientY-zoomState.translateY;
      zoomState.isDragging=true;
    }
  },{passive:false});
  body.addEventListener('touchmove',e=>{
    if(!zoomState.enabled||zoomState.mode!=='view')return;
    if(e.touches.length===2&&zoomState.initialPinchDistance>0){
      e.preventDefault();
      const dx=e.touches[1].clientX-e.touches[0].clientX;
      const dy=e.touches[1].clientY-e.touches[0].clientY;
      const currentDistance=Math.sqrt(dx*dx+dy*dy);
      const scaleMultiplier=currentDistance/zoomState.initialPinchDistance;
      const newScale=Math.min(Math.max(zoomState.initialScale*scaleMultiplier,1),3.5);
      const scaleRatio=newScale/zoomState.initialScale;
      zoomState.translateX=zoomState.pinchCenterX-(zoomState.pinchCenterX-zoomState.initialTranslateX)*scaleRatio;
      zoomState.translateY=zoomState.pinchCenterY-(zoomState.pinchCenterY-zoomState.initialTranslateY)*scaleRatio;
      zoomState.scale=newScale;
      updateZoomTransform();
    }else if(e.touches.length===1&&zoomState.isDragging){
      e.preventDefault();
      const touch=e.touches[0];
      zoomState.translateX=touch.clientX-zoomState.startX;
      zoomState.translateY=touch.clientY-zoomState.startY;
      updateZoomTransform();
    }
  },{passive:false});
  body.addEventListener('touchend',e=>{
    if(e.touches.length<2)zoomState.initialPinchDistance=0;
    if(e.touches.length===0)zoomState.isDragging=false;
  });
}

function renderDetailPanel(zid){
  const sec=SD[zid];
  const body=document.getElementById('sp-body');

  // Compute max block widths across all rows for column alignment
  const rows=sec.rows;
  const maxB4=Math.max(...rows.map(r=>(r.b4||[]).length));
  const maxB3=Math.max(...rows.map(r=>(r.b3||[]).length));
  const maxB2=Math.max(...rows.map(r=>(r.b2||[]).length));
  const maxB1=Math.max(...rows.map(r=>(r.b1||[]).length));

  const ghost=()=>`<span class="seat-ghost"></span>`;
  const aisle=(r)=>`<span class="sp-aisle">${r||''}</span>`;

  // Enable zoom for Orchestra sections
  const useZoom=['orchestra_1','orchestra_2'].includes(zid);
  const btnFn=useZoom?seatBtnWithLabel:seatBtn;

  let html=useZoom?`<div class="seat-container" data-zoom="low"><div class="sp-note">Stage</div><div class="sp-grid">`:`<div class="sp-note">Stage</div><div class="sp-grid">`;

  for(const rowObj of rows){
    const {row,b4=[],b3=[],b2=[],b1=[]}=rowObj;
    html+=`<div class="sp-row-wrap"><div class="sp-row-label">${row}</div><div class="sp-seats">`;

    // B4: right-aligned (pad left with ghosts so rightmost seat always in same column)
    const b4pad=maxB4-b4.length;
    for(let i=0;i<b4pad;i++) html+=ghost();
    b4.forEach(s=>{html+=btnFn(zid,row,s);});
    html+=aisle();

    // B3: right-aligned (pad left, so seat 40 always in aisle column)
    const b3pad=maxB3-b3.length;
    for(let i=0;i<b3pad;i++) html+=ghost();
    b3.forEach(s=>{html+=btnFn(zid,row,s);});
    html+=aisle();

    // B2: right-aligned (pad left, so seat 20 always in aisle column)
    const b2pad=maxB2-b2.length;
    for(let i=0;i<b2pad;i++) html+=ghost();
    b2.forEach(s=>{html+=btnFn(zid,row,s);});

    // B1: left-aligned (pad right), only if section has any B1
    if(maxB1>0){
      html+=aisle();
      b1.forEach(s=>{html+=btnFn(zid,row,s);});
      const b1pad=maxB1-b1.length;
      for(let i=0;i<b1pad;i++) html+=ghost();
    }

    html+=`</div></div>`;
  }
  html+=useZoom?`</div></div>`:`</div>`;
  body.innerHTML=html;
}

function renderSimplePanel(zid){
  const sec=SD[zid];
  const body=document.getElementById('sp-body');
  
  const useZoom=['ring_2','ring_4'].includes(zid);
  const btnFn=useZoom?seatBtnWithLabel:seatBtn;
  
  let html=useZoom?`<div class="seat-container" data-zoom="low"><div class="sp-grid">`:`<div class="sp-grid">`;
  for(const rowObj of sec.rows){
    const {row,seats}=rowObj;
    html+=`<div class="sp-row-wrap"><div class="sp-row-label">${row}</div><div class="sp-seats">`;
    seats.forEach(s=>{html+=btnFn(zid,row,s);});
    html+=`</div></div>`;
  }
  html+=useZoom?`</div></div>`:`</div>`;
  body.innerHTML=html;
}

function renderDCPanel(zid, reversed){
  const sec=SD[zid];
  const body=document.getElementById('sp-body');
  const rows=sec.rows;

  // Compute max block widths for column alignment
  const maxB1=Math.max(...rows.map(r=>(r.b1||[]).length));
  const maxB2=Math.max(...rows.map(r=>(r.b2||[]).length));
  const maxB3=Math.max(...rows.map(r=>(r.b3||[]).length));

  const ghost=()=>`<span class="seat-ghost"></span>`;
  const aisle=(r)=>`<span class="sp-aisle">${r}</span>`;
  
  const useZoom=['dress_circle_1','dress_circle_2'].includes(zid);
  const btnFn=useZoom?seatBtnWithLabel:seatBtn;

  let html=useZoom?`<div class="seat-container" data-zoom="low"><div class="sp-note">${reversed?'Stage':'Stage'}</div><div class="sp-grid">`:`<div class="sp-note">${reversed?'Stage':'Stage'}</div><div class="sp-grid">`;

  for(const rowObj of rows){
    const {row,b1=[],b2=[],b3=[]}=rowObj;
    html+=`<div class="sp-row-wrap"><div class="sp-row-label">${row}</div><div class="sp-seats">`;

    // B1 right-aligned (innermost block, closest to stage)
    const p1=maxB1-b1.length;
    for(let i=0;i<p1;i++) html+=ghost();
    b1.forEach(s=>{html+=btnFn(zid,row,s);});
    html+=aisle(row);

    // B2 right-aligned
    const p2=maxB2-b2.length;
    for(let i=0;i<p2;i++) html+=ghost();
    b2.forEach(s=>{html+=btnFn(zid,row,s);});
    if(maxB3>0){
      html+=aisle(row);
      // B3 left-aligned (outermost)
      b3.forEach(s=>{html+=btnFn(zid,row,s);});
      const p3=maxB3-b3.length;
      for(let i=0;i<p3;i++) html+=ghost();
    }
    html+=`</div></div>`;
  }
  html+=useZoom?`</div></div>`:`</div>`;
  body.innerHTML=html;
}
function renderParquetPanel(zid){
  const sec=SD[zid];
  const rows=sec.rows;
  const maxB1=Math.max(...rows.map(r=>r.b1.length));
  const maxB2=Math.max(...rows.map(r=>r.b2.length));
  const maxB3=Math.max(...rows.map(r=>r.b3.length));
  const ghost=()=>`<span class="seat-ghost"></span>`;
  const aisle=(r)=>`<span class="sp-aisle">${r}</span>`;
  
  const useZoom=zid==='parquet';
  const btnFn=useZoom?seatBtnWithLabel:seatBtn;
  
  let html=useZoom?`<div class="seat-container" data-zoom="low"><div class="sp-note">Stage</div><div class="sp-grid">`:`<div class="sp-note">Stage</div><div class="sp-grid">`;
  for(const {row,b1,b2,b3} of rows){
    html+=`<div class="sp-row-wrap"><div class="sp-row-label">${row}</div><div class="sp-seats">`;
    // B1 right-aligned
    for(let i=0;i<maxB1-b1.length;i++) html+=ghost();
    b1.forEach(s=>{html+=btnFn(zid,row,s);});
    html+=aisle(row);
    // B2 right-aligned (so seat 20 aligns to aisle)
    for(let i=0;i<maxB2-b2.length;i++) html+=ghost();
    b2.forEach(s=>{html+=btnFn(zid,row,s);});
    html+=aisle(row);
    // B3 left-aligned (seat 40 is leftmost)
    b3.forEach(s=>{html+=btnFn(zid,row,s);});
    for(let i=0;i<maxB3-b3.length;i++) html+=ghost();
    html+=`</div></div>`;
  }
  html+=useZoom?`</div></div>`:`</div>`;
  document.getElementById('sp-body').innerHTML=html;
}

function renderMezz1Panel(zid){
  const sec=SD[zid];
  const rows=sec.rows;
  const maxB1=Math.max(...rows.map(r=>r.b1.length));
  const maxB2=Math.max(...rows.map(r=>r.b2.length));
  const maxB3=Math.max(...rows.map(r=>r.b3.length));
  const maxB4=Math.max(...rows.map(r=>r.b4.length));
  const ghost=()=>`<span class="seat-ghost"></span>`;
  const aisle=(r)=>`<span class="sp-aisle">${r}</span>`;
  
  const useZoom=zid==='mezzanine_1';
  const btnFn=useZoom?seatBtnWithLabel:seatBtn;
  
  let html=useZoom?`<div class="seat-container" data-zoom="low"><div class="sp-note">Stage</div><div class="sp-grid">`:`<div class="sp-note">Stage</div><div class="sp-grid">`;
  for(const {row,b1,b2,b3,b4} of rows){
    html+=`<div class="sp-row-wrap"><div class="sp-row-label">${row}</div><div class="sp-seats">`;
    // B1 right-aligned (outer left)
    for(let i=0;i<maxB1-b1.length;i++) html+=ghost();
    b1.forEach(s=>{html+=btnFn(zid,row,s);});
    if(maxB1>0||b1.length>0) html+=aisle(row);
    // B2 right-aligned (ends before middle aisle)
    for(let i=0;i<maxB2-b2.length;i++) html+=ghost();
    b2.forEach(s=>{html+=btnFn(zid,row,s);});
    html+=aisle(row);
    // B3 left-aligned (starts after middle aisle)
    b3.forEach(s=>{html+=btnFn(zid,row,s);});
    for(let i=0;i<maxB3-b3.length;i++) html+=ghost();
    if(maxB4>0){
      html+=aisle(row);
      // B4 left-aligned (outer right)
      b4.forEach(s=>{html+=btnFn(zid,row,s);});
      for(let i=0;i<maxB4-b4.length;i++) html+=ghost();
    }
    html+=`</div></div>`;
  }
  html+=useZoom?`</div></div>`:`</div>`;
  document.getElementById('sp-body').innerHTML=html;
}


function render3BlockPanel(zid){
  const sec=SD[zid];
  const rows=sec.rows;
  const maxB1=Math.max(...rows.map(r=>(r.b1||[]).length));
  const maxB2=Math.max(...rows.map(r=>(r.b2||[]).length));
  const maxB3=Math.max(...rows.map(r=>(r.b3||[]).length));
  const ghost=()=>`<span class="seat-ghost"></span>`;
  const aisle=(r)=>`<span class="sp-aisle">${r}</span>`;
  const useZoom=['orchestra_3','mezzanine_2','mezzanine_3','mezzanine_4','mezzanine_5','mezzanine_6','mezzanine_7','mezzanine_8'].includes(zid);
  const btnFn=useZoom?seatBtnWithLabel:seatBtn;
  let html=useZoom?`<div class="seat-container" data-zoom="low"><div class="sp-note">Stage</div><div class="sp-grid">`:`<div class="sp-note">Stage</div><div class="sp-grid">`;
  for(const {row,b1=[],b2=[],b3=[]} of rows){
    html+=`<div class="sp-row-wrap"><div class="sp-row-label">${row}</div><div class="sp-seats">`;
    for(let i=0;i<maxB1-b1.length;i++) html+=ghost();
    b1.forEach(s=>{html+=btnFn(zid,row,s);});
    html+=aisle(row);
    for(let i=0;i<maxB2-b2.length;i++) html+=ghost();
    b2.forEach(s=>{html+=btnFn(zid,row,s);});
    html+=aisle(row);
    b3.forEach(s=>{html+=btnFn(zid,row,s);});
    for(let i=0;i<maxB3-b3.length;i++) html+=ghost();
    html+=`</div></div>`;
  }
  html+=useZoom?`</div></div>`:`</div>`;
  document.getElementById('sp-body').innerHTML=html;
}

function renderGenericPanel(zid){
  const cur=db[night]||{};
  const existing=Object.entries(cur).filter(([k])=>k.startsWith(zid+':'));
  const hint=GENERIC_HINTS[zid]||'';
  const exHtml=existing.length
    ?`<div style="margin-bottom:10px;font-size:12px">${existing.slice(0,8).map(([k,v])=>`<div>Seat <b>${k.split(':')[1]}</b> → <span style="color:#185FA5;font-weight:600">${v}</span></div>`).join('')}</div>`
    :'';
  document.getElementById('sp-body').innerHTML=`
    ${hint?`<div class="seat-hint">📍 ${hint}</div>`:''}
    ${exHtml}
    <p style="font-size:13px;color:#555;margin-bottom:10px">Seat picker coming soon. Enter manually for now:</p>
    <input type="text" id="gp-name" placeholder="Your Discord handle or name" style="width:100%;padding:9px 12px;font-size:14px;border:1.5px solid #ddd;border-radius:8px;outline:none;margin-bottom:8px" value="${myName}"/>
    <input type="text" id="gp-seat" placeholder="Row + Seat (e.g. D-47)" style="width:100%;padding:9px 12px;font-size:14px;border:1.5px solid #ddd;border-radius:8px;outline:none;margin-bottom:12px"/>
    <div style="display:flex;gap:8px">
      <button onclick="closePanel()" style="flex:1;padding:9px;border-radius:8px;border:1.5px solid #ddd;background:#fff;cursor:pointer;font-size:14px">Cancel</button>
      <button onclick="doGenericSave('${zid}')" style="flex:1;padding:9px;border-radius:8px;border:none;background:#185FA5;color:#fff;cursor:pointer;font-size:14px;font-weight:600">Claim</button>
    </div>`;
}

function handleSeat(zid,row,seat){
  const key=`${zid}:${row}-${seat}`;
  const who=(db[night]||{})[key];
  showClaimModal(zid,row,seat,who);
}

function showClaimModal(zid,row,seat,currentOwner){
  const isMine=currentOwner&&currentOwner===myName;
  const host=document.getElementById('modal-host');
  const bg=document.createElement('div');bg.className='claim-bg';
  bg.onclick=e=>{if(e.target===bg)closeClaim();};
  const m=document.createElement('div');m.className='claim-modal';
  const lbl=`Row ${row}, Seat ${seat}`;
  if(isMine){
    m.innerHTML=`<h3>${lbl}</h3><div class="sub">Claimed by you (${currentOwner})</div>
    <div class="cm-btns"><button class="cm-btn" onclick="closeClaim()">Keep it</button><button class="cm-btn d" onclick="doUnclaim('${zid}','${row}',${seat})">Unclaim</button></div>`;
  } else if(currentOwner){
    m.innerHTML=`<h3>${lbl}</h3><div class="sub">Claimed by <b style="color:#f97316">${currentOwner}</b></div>
    <input type="text" id="cm-name" placeholder="Your name to claim anyway" value="${myName}"/>
    <div class="cm-btns"><button class="cm-btn" onclick="closeClaim()">Cancel</button><button class="cm-btn p" onclick="doClaim('${zid}','${row}',${seat})">Claim Anyway</button></div>`;
  } else {
    m.innerHTML=`<h3>${lbl}</h3><div class="sub">${night==='fri'?'Friday':'Saturday'} night</div>
    <input type="text" id="cm-name" placeholder="Your name / Discord handle" value="${myName}"/>
    <div class="cm-btns"><button class="cm-btn" onclick="closeClaim()">Cancel</button><button class="cm-btn p" onclick="doClaim('${zid}','${row}',${seat})">Claim Seat</button></div>`;
  }
  bg.appendChild(m);host.appendChild(bg);
  setTimeout(()=>{
    const i=document.getElementById('cm-name');
    if(i){
      i.focus();i.select();
      i.addEventListener('keydown',e=>{if(e.key==='Enter')doClaim(zid,row,seat);if(e.key==='Escape')closeClaim();});
    }
  },30);
}
function closeClaim(){document.getElementById('modal-host').innerHTML='';}

async function doClaim(zid,row,seat){
  const name=(document.getElementById('cm-name')?.value||'').trim();
  if(!name){document.getElementById('cm-name')?.classList.add('ef');return;}
  myName=name;localStorage.setItem('bch_name',name);
  if(!db[night])db[night]={};
  db[night][`${zid}:${row}-${seat}`]=name;
  await storageSet('bch_v2_'+night,JSON.stringify(db[night]));
  closeClaim();
  if(document.getElementById('seat-panel').classList.contains('open')&&SD[zid]){
    const t=SD[zid].type;
    if(t==='simple') renderSimplePanel(zid);
    else if(t==='dc') renderDCPanel(zid,false);
    else if(t==='dc2') renderDCPanel(zid,true);
    else if(t==='3block') render3BlockPanel(zid);
    else if(t==='parquet') renderParquetPanel(zid);
    else if(t==='mezz1') renderMezz1Panel(zid);
    else renderDetailPanel(zid);
  }
  renderAll();
}

async function doUnclaim(zid,row,seat){
  if(!db[night])return;
  delete db[night][`${zid}:${row}-${seat}`];
  await storageSet('bch_v2_'+night,JSON.stringify(db[night]));
  closeClaim();
  if(document.getElementById('seat-panel').classList.contains('open')&&SD[zid]){
    const t=SD[zid].type;
    if(t==='simple') renderSimplePanel(zid);
    else if(t==='dc') renderDCPanel(zid,false);
    else if(t==='dc2') renderDCPanel(zid,true);
    else if(t==='parquet') renderParquetPanel(zid);
    else if(t==='mezz1') renderMezz1Panel(zid);
    else renderDetailPanel(zid);
  }
  renderAll();
}

async function doGenericSave(zid){
  const name=(document.getElementById('gp-name')?.value||'').trim();
  const seat=(document.getElementById('gp-seat')?.value||'').trim();
  if(!name||!seat)return;
  myName=name;localStorage.setItem('bch_name',name);
  if(!db[night])db[night]={};
  db[night][`${zid}:${seat}`]=name;
  await storageSet('bch_v2_'+night,JSON.stringify(db[night]));
  closePanel();renderAll();
}

function renderRoster(){
  const cur=db[night]||{};
  const byP={};
  for(const[k,v]of Object.entries(cur)){
    const parts=k.split(':');const zid=parts[0];const seat=parts.slice(1).join(':');
    const zn=(ZONES.find(z=>z[0]===zid)||[,'?'])[1];
    if(!byP[v])byP[v]=[];
    byP[v].push(`${zn} ${seat}`);
  }
  const grid=document.getElementById('rgrid');grid.innerHTML='';
  const ppl=Object.keys(byP).sort();
  if(!ppl.length){grid.innerHTML='<span class="empty">No seats claimed yet — be first! 🎺</span>';return;}
  ppl.forEach(name=>{
    const c=document.createElement('div');c.className='chip';
    c.innerHTML=`<b>${name}</b> <span class="s">(${byP[name].join(', ')})</span>`;
    grid.appendChild(c);
  });
}

// Prevent double-tap zoom on buttons (iOS Safari)
document.addEventListener('DOMContentLoaded',()=>{
  let lastTap=0;
  document.addEventListener('touchend',(e)=>{
    const now=Date.now();
    if(now-lastTap<300&&e.target.closest('button, .zone, .seat-btn')){
      e.preventDefault();
    }
    lastTap=now;
  });
});