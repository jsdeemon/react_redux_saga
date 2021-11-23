# React + Redux + Saga 
https://www.youtube.com/watch?v=G3GGXIhggGs  

### npx create-react-app . 

в public/index.html подключаем css стили https://www.getbootstrap.com 

классы нужны, когда нам нужны особые хуки жизненного цикла 

абсолютно универсальный способ ОБРАБОТКИ ИНПУТОВ 

  changeInputHandler = event => {
        this.setState(prev => ({...prev, ...{
            [event.target.name]: event.target.value 
        }}))
    }


контекст и useReducer не убивают redux 

потому, что redux - это большая инфраструктура, где есть  множество 
Redux - это парадигма. отделяющая данные от слоя представления 

контекст выполняет ту же самую роль. НО ТАМ НЕТ ПРИВЯЗКИ К СТАНДАРТНОМУ ПОВЕДЕНИЮ РЕДАКСА,  
во FLUX множество стейтов 

Context существует только в рамках Реакта для того, чтобы передавать свойства 


### УСТАНОВКА РЕДАКСА

### npm install redux react-redux

сам по себе редакс не привязан к реакту 

### ПОДКЛЮЧЕНИЕ REDUX к проекту 

переходим в файл index.js 

// создаем store 
const store = createStore(rootReducer);

первым параметром принимаем rootReducer 


redux -> rootReducer.js 
import {combineReducers} from 'redux';
import { postsReducer } from './postsReducer';

export const rootReducer = combineReducers({
    posts: postsReducer
})

редюсеры - это чистые функции

postsReducer.js 
const initialState = {
    posts: [],
    fetchedPosts: []
}

export const postsReducer = (state = initialState, action) => {
return state;
}

import {Provider] from 'react-redux' 

Provider - ЭТО КОМПОНЕНТ ВЫСШЕГО ПОРЯДКА, который не создает свой шаблон и в который мы оборачиваем наще приложение 

// создаем store 
const store = createStore(rootReducer);

const app = (
  <Provider store={store}>
<App />
  </Provider>
)

ReactDOM.render(app, document.getElementById('root')); 


### ПОДКЛЮЧАЕМ DEVTOOLS 

гуглим redux devtools extension 

переходим на гитхаб:
https://github.com/zalmoxisus/redux-devtools-extension 

теперь код выглядит так: 
// создаем store 
const store = createStore(rootReducer, compose(
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)); 



### ФУНКЦИОНАЛ ДОБАВЛЕНИЯ АСИНХРОННОГО ПОСТА 

ГЛУПЫЙ КОМПОНЕНТ - работает только с шаблоном и только с входящими данными 

УМНЫЙ КОМПОНЕНТ УМЕЕТ ПОЛУЧАТЬ ДАННЫЕ ИЗ СТОРА 

функция connect - она дополняет компонент новым функционалом 

export default connect()(Posts);  

mapStateToProps преобразовывает стейт в пропсы 
const mapStateToProps = state => ({
    
}) 

ДИСПАТЧИТЬ НОВОЕ СОБЫТИЕ 

redux -> types.js 
там переменные 

после этого создаем switch case в posts reducer 
 switch(action.type) {

        case CREATE_POST:
        //    return {...state, posts: state.posts.concat(action.payload)}
        return { ...state, posts: [...state.posts, action.payload] } // новый синтаксис
        default: return state;
    }


а потом action creator 

redux -> actions.ts 
import { CREATE_POST } from "./types";

export function createPost(post) {
    return {
    type: CREATE_POST,
    payload: post 
}
}


ТЕПЕРЬ НУЖНО ЭКШЕН ОТДИСПАТЧИТЬ 

в классе PostForm 
export default connect()(PostForm) 


mapDispatchToProps 

туда передаются экшены для диспатча 

const mapDispatchToProps = {
    createPost
} 



export default connect(null, mapDispatchToProps)(PostForm)


### РАБОТА С АСИНХРОННОСТЬЮ 
для того, чтобы работать с асинхронностью, нужен дополнительный пакет
устанавливаем redux thunk 

### npm install redux-thunk 

redux thunk является middleware для стора 

добавляем thunk в приложение
файл index.js 

// создаем store 
const store = createStore(rootReducer, compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));


thunk дает возможность диспатчить асинхронные события 


Pure functions - это такие функции, которые работают независимо ни от чего 

они работаюто только через входные параметры, при этом не основываются ни на каких глобальных объектах 
вся логика завязана только внутри них 
  и такие функции можно переиспользовать 


сервис Jsonplaceholder 

https://jsonplaceholder.typicode.com/ 

для того, чтобы диспатчить экшены в стор 
const dispatch = useDispatch() 

<button className="btn btn-primary"
        onClick={dispatch(fetchPosts)}
        >Загрузить</button>

пищем, что нам нужно достать их стора
с помощью useSelector 
const posts = useSelector(state => state.posts.fetchedPosts)

 
### MIDDLEWARE 

redux -> middleware.js 
import { CREATE_POST } from './types';
import { showAlert } from './actions';

const forbidden = ['fuck', 'spam', 'php'];

export function forbiddenWordsMiddleware({ dispatch }) {
    return function(next) {
        return function(action) {
            if (action.type === CREATE_POST) {
                const found = forbidden.filter(w => action.payload.title.includes(w));
                if (found.length) {
                    return dispatch(showAlert('Не нужно спамить!!!'))
                }
            } 
            return next(action)
        }
    }
} 

добавляем миддлвайр в index.js 
applyMiddleware(thunk, forbiddenWordsMiddleware) 


### REDUX SAGA 

саги - это то, что позволяет работать с сайд эффектами в редаксе 

### УСТАНАВЛИВАЕМ САГУ 
### npm install redux-saga 

НАСТРОЙКА SAGA 

саги хранятся в redux -> sagas.js 

export function* sagaWatcher() {

}

в файле index.js 
import createSagaMiddleware from 'redux-saga' 

// создаем сагу
const saga = createSagaMiddleware()

applyMiddleware(thunk, forbiddenWordsMiddleware, saga),

// привязываем вотчер к саге
saga.run(sagaWatcher)

https://redux-saga.js.org/

ДАЛЕЕ РАБОТАЕТ ВНУТРИ САГ 
ДОБАВЛЯЕМ САЙД ЭФФЕКТ 
