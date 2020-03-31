Задание:
Дана доска размером M × N клеток. Клетка может находиться в одном из двух состояний: 1 — живая, 0 — мёртвая. Каждая клетка взаимодействует с восемью соседями. Правила таковы:
Живая клетка, у которой меньше двух живых соседей, погибает.
Живая клетка, у которой два или три живых соседа, выживает.
Живая клетка, у которой больше трёх живых соседей, погибает.
Мёртвая клетка, у которой три живых соседа, возрождается.

Напишите программу, которая будет:
— случайным образом генерить стартовое состояние;
— уметь получать его из файла (способ выбирается через параметры запуска в консоли);
— каждую секунду выводить в консоль новое состояние доски.

Результат:
программа получает матрицу 3-мя способами:
1) если при запуске указать количество строк и столбцов, программа создаст матрицу указанного размера и заполнит ее рандомными значениями 1 или 0
например 'node final.js 4 5'
2) если при запуске указан путь до файла с матрицей
например 'node final.js C://Desktop/matrix.txt'
  2*) при этом матрица в файле может быть записана в виде
    0,1,1
    1,0,1
    1,1,0    
   или в виде [[0,0,1],[0,1,0],[1,1,0]]
3) в остальных случаях будет создана матрица размером 3х3, заполненная рандомными значениями 1 или 0
