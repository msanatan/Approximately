extends Node2D

onready var answer_1: Label = $Answer1
onready var answer_2: Label = $Answer2
onready var answer_3: Label = $Answer3
onready var answer_4: Label = $Answer4


func set_answers(answers: Array):
    answer_1.text = str(answers[0])
    answer_2.text = str(answers[1])
    answer_3.text = str(answers[2])
    answer_4.text = str(answers[3])
