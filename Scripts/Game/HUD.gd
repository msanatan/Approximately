extends Node2D

onready var next_answer_label = $CanvasLayer/NextAnswerLabel
onready var remaining_answer_label = $CanvasLayer/RemainingAnswersLabel


func _on_Game_remaining_time_update(remaining_time):
	next_answer_label.text = 'Next Answer In: ' + str(int(remaining_time))


func _on_Game_remaining_tries_update(remaining_tries):
	remaining_answer_label.text = 'Remaining Tries: ' + str(remaining_tries)