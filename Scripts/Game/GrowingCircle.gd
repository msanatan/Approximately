extends Node2D

export var GROW_INTERVAL = 0.1
onready var circle: Sprite = $CircleSprite
onready var question_label: Label = $QuestionLabel


func _process(delta):
    circle.rotate(delta * PI * 2)


func set_question(num_1: int, num_2: int, operator: String):
    question_label.text = "%d %s %d" % [num_1, operator, num_2]


func _on_Game_grow_circle():
    circle.scale.x += GROW_INTERVAL
    circle.scale.y += GROW_INTERVAL
