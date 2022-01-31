extends Node2D

onready var total_questions_label: Label = $StatsContainer/TotalQuestionsLabel
onready var total_correct_label: Label = $StatsContainer/TotalCorrectLabel
onready var total_wrong_label: Label = $StatsContainer/TotalWrongLabel
onready var results_label: Label = $ResultsMessageLabel


func _ready():
    total_questions_label.text = 'Total Questions: ' + str(Global.total_questions)
    total_correct_label.text = 'Total Correct: ' + str(Global.total_correct)
    total_wrong_label.text = 'Total Wrong: ' + str(Global.total_wrong)

    if Global.total_wrong == 0 and Global.total_questions >= 10:
        results_label.text = "You're acing it!\nKeep up the good work!"
    elif Global.total_wrong == 0 and Global.total_questions < 10:
        results_label.text = "All correct!\nKeep it up and go for more!"
    elif Global.total_correct >= Global.total_wrong and Global.total_questions >= 10:
        results_label.text = "Keep it up!\nYou're doing well, just take your time!"
    elif Global.total_correct >= Global.total_wrong and Global.total_questions < 10:
        results_label.text = "You're on the right path!\nTry to focus on accuracy!"
    elif Global.total_correct < Global.total_wrong:
        results_label.text = "Don't give up!\nIt's all about practice, you got this!"


func _on_ReplayButton_pressed():
    Global.total_questions = 0
    Global.total_correct = 0
    Global.total_wrong = 0
    $GameOverTransition.transition_start('#0f3daa')


func _on_GameOverTransition_transition_finished():
    get_tree().change_scene('res://Scenes/Game.tscn')


func _on_MainMenuButton_pressed():
    $FadeTransition.show()
    $FadeTransition.fade_out()


func _on_FadeTransition_transition_finished():
    get_tree().change_scene('res://Scenes/MainMenu.tscn')
