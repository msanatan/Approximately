extends Node2D

signal remaining_time_update
signal remaining_tries_update
signal grow_circle

export var remaining_tries = 5
onready var question_timer = $QuestionTimer

func _ready():
    emit_signal('remaining_tries_update', remaining_tries)

func _on_QuestionTimer_timeout():
    emit_signal('grow_circle')
    remaining_tries -= 1
    emit_signal('remaining_tries_update', remaining_tries)


func _on_RefreshTimer_timeout():
	emit_signal('remaining_time_update', question_timer.get_time_left())
