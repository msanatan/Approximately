extends Node2D

onready var circle: Sprite = $CircleSprite

func _ready():
    $FadeTransition.fade_in()

func _process(delta):
    circle.rotate(delta * PI * 2)


func _on_PlayButton_pressed():
    $GameOverTransition.transition_start('#0f3daa')


func _on_GameOverTransition_transition_finished():
    get_tree().change_scene('res://Scenes/Game.tscn')


func _on_FadeTransition_transition_finished():
    $FadeTransition.hide()
