extends Node2D

func _ready():
    $StatsContainer/TotalQuestionsLabel.text = 'Total Questions: ' + str(Global.total_questions)
    $StatsContainer/TotalCorrectLabel.text = 'Total Correct: ' + str(Global.total_correct)
    $StatsContainer/TotalWrongLabel.text = 'Total Wrong: ' + str(Global.total_wrong)

    if Global.total_correct == Global.total_questions and Global.total_questions >= 10:
        $ResultsMessageLabel.text = "You're acing it!\nKeep up the good work!"
    elif Global.total_correct == Global.total_questions and Global.total_questions < 10:
        $ResultsMessageLabel.text = "All correct!\nKeep it up and go for more!"
    elif Global.total_correct >= Global.total_wrong and Global.total_questions >= 10:
        $ResultsMessageLabel.text = "Keep it up!\nYou're doing well, just take your time!"
    elif Global.total_correct >= Global.total_wrong and Global.total_questions < 10:
        $ResultsMessageLabel.text = "You're on the right path!\nTry to focus on accuracy!"
    elif Global.total_correct < Global.total_wrong:
        $ResultsMessageLabel.text = "Don't give up!\nIt's all about practice, you got this!"
