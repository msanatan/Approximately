extends Node2D

signal remaining_time_update
signal remaining_tries_update
signal grow_circle

export var remaining_tries = 5
export var game_duration = 60
onready var question_timer = $GameTimer
onready var hud = $HUD

func _ready():
    hud.set_remaining_tries_text(remaining_tries)
    hud.set_countdown_text(game_duration)


func _on_GameTimer_timeout():
    game_duration -= 1
    emit_signal('remaining_time_update', game_duration)
