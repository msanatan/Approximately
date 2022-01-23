extends Node2D

export var GROW_INTERVAL = 0.1
onready var circle = $Sprite

func _process(delta):
    circle.rotate(delta * PI * 2)


func _on_Game_grow_circle():
    circle.scale.x += GROW_INTERVAL
    circle.scale.y += GROW_INTERVAL
