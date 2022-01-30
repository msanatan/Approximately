extends Node2D

signal remaining_time_update
signal remaining_tries_update
signal grow_circle
signal new_question

export var remaining_tries: int = 5
export var game_duration: int = 60
onready var question_timer = $GameTimer
onready var hud = $HUD
onready var growing_circle = $GrowingCircle
onready var answer_node = $Answers

# Game logic
var answer_diff: Array = [-3, -2, -1, 1, 2, 3]
var wrong_answer_diff: Array = [-6, -5, -4, 4, 5, 6]
var question_number_1: int
var question_number_2: int
var operator: String = "+"
var answers: Array = []
var correct_answer: int = 0


func _ready():
    randomize()
    hud.set_remaining_tries_text(remaining_tries)
    hud.set_countdown_text(game_duration)
    reset_question_and_answers()


func generate_question():
    question_number_1 = randi() % 35 + 5
    question_number_2 = randi() % 35 + 5

    if operator == "+":
        correct_answer = question_number_1 + question_number_2

    var close_answer: int = correct_answer + answer_diff[randi() % answer_diff.size()]
    var wrong_answer_1: int = correct_answer + wrong_answer_diff[randi() % answer_diff.size()]
    var wrong_answer_2: int = wrong_answer_1 + answer_diff[randi() % answer_diff.size()]
    answers = [correct_answer, close_answer, wrong_answer_1, wrong_answer_2]
    answers.shuffle()
    Global.total_questions += 1


func reset_question_and_answers():
    generate_question()
    growing_circle.set_question(question_number_1, question_number_2, operator)
    answer_node.set_answers(answers, correct_answer)


func _on_GameTimer_timeout():
    game_duration -= 1
    emit_signal('remaining_time_update', game_duration)

    if game_duration == 0:
        $GameTimer.stop()
        $GameOverTransition.transition_start()


func _on_Answers_wrong_answer_selected():
    Global.total_wrong += 1
    remaining_tries -= 1
    emit_signal('remaining_tries_update', remaining_tries)
    emit_signal('grow_circle')

    if remaining_tries == 0:
        $GameOverTransition.transition_start()


func _on_Answers_right_answer_selected():
    Global.total_correct += 1
    reset_question_and_answers()


func _on_GameOverTransition_transition_finished():
    get_tree().change_scene('res://Scenes/GameOver.tscn')
