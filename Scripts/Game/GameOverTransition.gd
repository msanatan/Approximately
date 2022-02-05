extends Node2D

signal transition_finished


func transition_start(colour:String='#ffffff'):
    $TransitionCircle.modulate = colour
    $AnimationPlayer.play('WhiteCircleGrow')


func _on_AnimationPlayer_animation_finished(anim_name:String):
	emit_signal('transition_finished')
