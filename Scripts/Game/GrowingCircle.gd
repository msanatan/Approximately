extends Node2D

onready var circle = $Sprite

func _process(delta):
    circle.rotate(delta * PI * 2)
