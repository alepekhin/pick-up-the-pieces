import * as React from 'react';
import FooterComponent from '../../filter/components/Footer';
import TodoItem from './TodoItem';
import { VisibilityFilters } from '../../filter/filterSlice';
import {clearCompleted, completeAll } from '../todoSlice';
import { useSelector } from 'react-redux';
import { connect } from 'react-redux';

const TODO_FILTERS = {
  [VisibilityFilters.SHOW_ALL]: () => true,
  [VisibilityFilters.SHOW_ACTIVE]: todo => !todo.completed,
  [VisibilityFilters.SHOW_COMPLETED]: todo => todo.completed
};

const mapDispatch = {clearCompleted, completeAll };

const MainSection = ({clearCompleted, completeAll }) => {

  //const [filter, setFilter] = useState(VisibilityFilters.SHOW_ALL);
  const todos = useSelector(state => state["todos"]);
  const filter = useSelector(state => state["visibilityFilter"]);

  function handleClearCompleted() {
    const atLeastOneCompleted = todos.some(todo => todo.completed);
    if (atLeastOneCompleted) {
      clearCompleted('');
    }
  }

  function handlerCompleteAll(e) {
    completeAll('');
  }

  function renderToggleAll(completedCount) {
    if (todos.length > 0) {
      return (
        <input
          type="checkbox"
          title="Select/Deselect all"
          checked={completedCount === todos.length}
          onChange={handlerCompleteAll} />
      );
    }
  }

  function renderFooter(completedCount) {
    const activeCount = todos.length - completedCount;

    if (todos.length) {
      return (
        <FooterComponent
          activeCount={activeCount}
          completedCount={completedCount}
          onClearCompleted={handleClearCompleted}
         />
      );
    }
  }

  function render() {
    const filteredTodos = todos.filter(TODO_FILTERS[filter]);
    const completedCount = todos.reduce((count, todo) => {
      return todo.completed ? count + 1 : count;
    }, 0);

    return (
      <section>
        {renderToggleAll(completedCount)}
        <ul>
          {filteredTodos.map(todo =>
            <TodoItem key={todo.id} todo={todo} />
          )}
        </ul>
        {renderFooter(completedCount)}
      </section>
    );
  }

  return render();

}

export default connect(null, mapDispatch)(MainSection)
