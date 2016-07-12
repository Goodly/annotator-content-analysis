export const ACTIVATE_TOPIC = 'ACTIVATE_TOPIC';
export const NEW_QUESTIONS = 'NEW_QUESTIONS';
export const NEW_ARTICLE = 'NEW_ARTICLE';
/*export const DELETE_HIGHLIGHT = 'DELETE_HIGHLIGHT';
export const SELECT_HIGHLIGHT = 'SELECT_HIGHLIGHT';
export const ADD_HIGHLIGHT = 'ADD_HIGHLIGHT';

export function addHighlight(start, end, selectedText) {
  return { type: ADD_HIGHLIGHT, selection: {start, end, selectedText} };
}

export function deleteHighlight(source) {
  return { type: DELETE_HIGHLIGHT, highlights: source };
}

export function selectHighlight(source) {
  return { type: SELECT_HIGHLIGHT, highlights: source };
}*/

export function activateTopic(topic) {
  return { type: ACTIVATE_TOPIC, topic };
}

export function newQuestions(questions) {
  return { type: NEW_QUESTIONS, questions };
}
export function newArticle(article) {
  // Where article is the index of the next article to get, or null to indicate
  // we should hit the backend for a fresh batch of articles
  return { type: NEW_ARTICLE, article };
}

export function getArticle(articleId) {
  return {
    type: 'GET_ARTICLE',
    articleId
  };
}
