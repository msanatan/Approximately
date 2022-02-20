extends Node2D

onready var circle: Sprite = $CircleSprite
var volume_on = load('res://Assets/Images/UI/volume-up-4-512.png')
var volume_off = load('res://Assets/Images/UI/mute-2-512.png')
var sound_on: bool = true

func _ready():
    $FadeTransition.fade_in()
    if not MusicPlayer.playing:
        $SoundButton/SoundIcon.set_texture(volume_off)
        sound_on = false

func _process(delta):
    circle.rotate(delta * PI * 2)


func _on_PlayButton_pressed():
    $PlayButton.visible = false
    $CircleGrowingTransition.transition_start('#0f3daa')


func _on_CircleGrowingTransition_transition_finished():
    get_tree().change_scene('res://Scenes/Game.tscn')


func _on_FadeTransition_transition_finished():
    $FadeTransition.hide()


func _on_SoundButton_pressed():
    if sound_on:
        MusicPlayer.stop()
        $SoundButton/SoundIcon.set_texture(volume_off)
    else:
        MusicPlayer.play()
        $SoundButton/SoundIcon.set_texture(volume_on)

    $SoundButton/SoundIcon.modulate = '#0f3daa'
    sound_on = !sound_on
