extends Node2D

func _ready():
    $StatsContainer/TotalQuestionsLabel.text = 'Total Questions: ' + str(Global.total_questions)
    $StatsContainer/TotalCorrectLabel.text = 'Total Correct: ' + str(Global.total_correct)
    $StatsContainer/TotalWrongLabel.text = 'Total Wrong: ' + str(Global.total_wrong)

    if Global.total_wrong == 0 and Global.total_questions >= 10:
        $ResultsMessageLabel.text = "You're acing it!\nKeep up the good work!"
    elif Global.total_wrong == 0 and Global.total_questions < 10:
        $ResultsMessageLabel.text = "All correct!\nKeep it up and go for more!"
    elif Global.total_correct >= Global.total_wrong and Global.total_questions >= 10:
        $ResultsMessageLabel.text = "Keep it up!\nYou're doing well, just take your time!"
    elif Global.total_correct >= Global.total_wrong and Global.total_questions < 10:
        $ResultsMessageLabel.text = "You're on the right path!\nTry to focus on accuracy!"
    elif Global.total_correct < Global.total_wrong:
        $ResultsMessageLabel.text = "Don't give up!\nIt's all about practice, you got this!"


func _on_ReplayButton_pressed():
    Global.total_questions = 0
    Global.total_correct = 0
    Global.total_wrong = 0
    $GameOverTransition.transition_start('#0f3daa')


func _on_GameOverTransition_transition_finished():
    get_tree().change_scene('res://Scenes/Game.tscn')
