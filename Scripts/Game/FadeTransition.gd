extends Node2D

signal transition_finished

func fade_in():
    $AnimationPlayer.play('fade_in')


func fade_out():
    $AnimationPlayer.play('fade_out')


func _on_AnimationPlayer_animation_finished(anim_name:String):
    emit_signal('transition_finished')
