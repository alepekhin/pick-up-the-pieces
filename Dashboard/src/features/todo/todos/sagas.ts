import { takeEvery, all } from 'redux-saga/effects';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

function* helloSaga() {
    yield console.log('Hello Sagas!')
}

function* incrementAsync() {
    console.log('waiting 10 sec');
    yield delay(10000)
    yield console.log('do something at the action todos/addTodo ');
}

function* watchIncrementAsync() {
    console.log('>>> waiting 5 sec');
    yield delay(5000)
    console.log('then tic');
    yield takeEvery('todos/addTodo', incrementAsync)
}

export default function* rootSaga() {
    yield all([
        helloSaga(),
        watchIncrementAsync()
    ])
}