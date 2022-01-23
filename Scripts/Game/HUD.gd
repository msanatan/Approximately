extends Node2D

onready var next_answer_label = $CanvasLayer/RemainingTimeLabel
onready var remaining_answer_label = $CanvasLayer/RemainingAnswersLabel


func set_countdown_text(remaining_time):
    next_answer_label.text = str(remaining_time)


func set_remaining_tries_text(remaining_tries):
    remaining_answer_label.text = 'Remaining Tries: ' + str(remaining_tries)


func _on_Game_remaining_time_update(remaining_time):
	set_countdown_text(remaining_time)


func _on_Game_remaining_tries_update(remaining_tries):
	set_remaining_tries_text(remaining_tries)
