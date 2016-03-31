import { newQuestions } from 'actions/actions';
import classNames from 'classnames';
import QuizQuestion from 'components/quiz/QuizQuestion.js';
import React from 'react';
import ReactCSSTransitionsGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import tmpQuestions from 'assets/tmpQuestions.json';

import 'Quiz.scss';
import 'fadeIn.scss';

const mapDispatchToProps = dispatch => {
  return {
    onNewQuestions: questions => {
      dispatch(newQuestions(questions));
    }
  };
}

const mapStateToProps = state => {
  return { questions: state.quizReducers.questions };
}

const Quiz = React.createClass({
  displayName: 'Quiz',

  propTypes: {
    onNewQuestions: React.PropTypes.func,
    questions: React.PropTypes.array.isRequired
  },

  getInitialState: function() {
    var questionFlags = {}
    for (var i = 0; i < this.props.questions.length; i++) {
      if (this.props.questions[i].type !== 'text') {
        questionFlags[this.props.questions[i].id] = false
      }
    }
    //console.log(questionFlags);
    return {questionAnswerFlags: questionFlags, answerText: {}};
  },

  onUpdate: function(questionId, onAnswered, text=null) {
    if (text === null) {
      var questionFlags = this.state.questionAnswerFlags;
      questionFlags[questionId] = onAnswered;
      this.setState({questionAnswerFlags: questionFlags});
    } else {
      //console.log(text);
      var answerText = this.state.answerText === null ? {} : this.state.answerText;
      answerText[questionId] = text;
      this.setState({answerText: answerText});
      //console.log(answerText);
      //need to store in state
    }
  },

  textQuestionClickNext: function() {
    var filteredTextQuestionsArray = this.props.questions.filter(obj => obj.type === 'text').map(obj => obj.id);
    var answerText = this.state.answerText;
    console.log(filteredTextQuestionsArray);
    if (filteredTextQuestionsArray.length > 0 && answerText !== {}) {
      console.log(answerText);
      var value = filteredTextQuestionsArray.every(elem => answerText[elem] !== '' && answerText[elem] !== undefined);
      console.log(value);
      return value;
    }
    return answerText !== {};
  },

  nextButtonCheck: function(f) {
    var questions = this.props.questions;
    //need to include date type into this
    var filteredQuestionsArray = questions.filter(obj => obj.type !== 'text')
                                 .map(obj => obj.id);
    return filteredQuestionsArray
           .every(elem => Object.keys(f).map(i => parseInt(i)).includes(elem));
  },

  canClickNext: function() {
    var f = this.state.questionAnswerFlags;
    return !Object.keys(f).map(i => f[i]).includes(false)
           && this.textQuestionClickNext()
           && this.nextButtonCheck(f);
  },

  prompt: function() {
    var f = this.state.questionAnswerFlags;
    return Object.keys(f).map(i => f[i]).includes(true);
  },

  handleNext: function() {
    // on click, stuff in textbox should be saved
    //console.log(this.state.answerText);
    this.props.onNewQuestions(tmpQuestions.questions);
  },

  render() {
    //console.log(this.canClickNext())
    var opts = this.canClickNext() ? {} : {disabled: true};
    return (
      <ReactCSSTransitionsGroup transitionName='fadein'
                                transitionAppear
                                transitionAppearTimeout={500}
                                transitionEnterTimeout={500}
                                transitionLeaveTimeout={500}>
        <span className={classNames('prompt', {active: this.prompt()})}>Please highlight the text from below</span>
        <div className='quiz'>
          {this.props.questions.map((question) => {
            return (
              <QuizQuestion key={question.id}
                            question={question}
                            onUpdate={this.onUpdate} />
            );
          })}
          <button className='quiz__next' {...opts}
                  onClick={this.handleNext}
          >
            Next
          </button>
        </div>
      </ReactCSSTransitionsGroup>
    );
  }

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quiz);
