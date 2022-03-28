import { SubTitle } from '@/components/DesignSystem';
import { useReducer } from 'react';
import LayoutToExperiments from '@/components/LayoutToExperiments';
import style from './calculator.module.css';

const btnStyle = 'bg-zinc-200 text-zinc-800 border border-zinc-500 hover:bg-zinc-300 ';

const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate',
};

const INTEGER_FORMATTER = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 0
})

function formatOperand(operand){
  if (operand == null) return
  const [integer, decimal] = operand.split('.');
  if (decimal == null) return INTEGER_FORMATTER.format(integer)
}

function reducer(
    state,
    { type, payload }
  ) {
    switch (type) {
      case ACTIONS.ADD_DIGIT:
        if(state.overwrite){
          return {
            ...state,
            currentOperand: payload.digit,
            overwrite: false,
          }
        }

        if (payload.digit === '0' && state.currentOperand === '0'){
          return state
        }

        if (payload.digit === '.' && state.currentOperand.includes('.')){
          return state
        }

        return {
          ...state,
          currentOperand: `${state.currentOperand || ''}${payload.digit}`,
        };
      
      case ACTIONS.CHOOSE_OPERATION:
        if (state.currentOperand === null && state.previousOperand === null) {
          return state
        }

        if (state.currentOperand === null){
          return {
            ...state, 
            operation: payload.operation
          }
        }

        if (state.previousOperand === null){
          return {
            ...state, 
            operation : payload.operation,
            previousOperand: state.currentOperand,
            currentOperand: null
          }
        }

        return {
          ...state,
          previousOperand: evaluate(state),
          operation: payload.operation,
          currentOperand: null,
        }

      case ACTIONS.EVALUATE:
        if(state.operation == null || state.currentOperand == null || state.previousOperand == null){
          return state
        }

        return{
          ...state,
          overwrite: true,
          previousOperand: null,
          operation: null,
          currentOperand: evaluate(state)
        }

      case ACTIONS.DELETE_DIGIT:
        if(state.overwrite) {
          return {
            ...state, 
            overwrite: false,
            currentOperand: null
          }
        }

        if(state.currentOperand == null){
          return state
        }

        if(state.currentOperand.length === 1){
          return{
            ...state,
            currentOperand: null 
          }
        }

        return{
          ...state,
          currentOperand: state.currentOperand.slice(0, -1)
        }

      case ACTIONS.CLEAR:
        return {};
    }
  }

function evaluate({ currentOperand, previousOperand, operation }){
  const prev = parseFloat(previousOperand)
  const current = parseFloat(currentOperand)

  if(isNaN(prev) || isNaN(current)) return ""

  let computation = ""

  switch(operation){
    case "+":
      computation = prev + current
      break
    case "-":
        computation = prev - current
        break
    case "*":
      computation = prev * current
      break
    case "+":
      computation = prev / current
      break
  }

  return computation.toString()
}


function Calculator() {
  
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, {});

  // dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: 1 } });
  return (
    <LayoutToExperiments domain='React' title='Calculator'>
      <SubTitle>React Calculator - Web Dev Simplify</SubTitle>
      <div className={style.calculatorGrid}>
        <section className={`${style.output} border border-zinc-500`}>
          <div className={style.previousOperand}>
            {formatOperand(previousOperand)} {operation}
          </div>
          <div className={style.currentOperand}>{formatOperand(currentOperand)}</div>
        </section>
        <button
          className={`${style.spanTwo} ${btnStyle}`}
          onClick={() => dispatch({ type: ACTIONS.CLEAR })}
        >
          AC
        </button>
        <button className={btnStyle} onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>DEL</button>
        <OperationButton operation='÷' dispatch={dispatch} />
        <DigitButton digit='1' dispatch={dispatch} />
        <DigitButton digit='2' dispatch={dispatch} />
        <DigitButton digit='3' dispatch={dispatch} />
        <OperationButton operation='*' dispatch={dispatch} />
        <DigitButton digit='4' dispatch={dispatch} />
        <DigitButton digit='5' dispatch={dispatch} />
        <DigitButton digit='6' dispatch={dispatch} />
        <OperationButton operation='+' dispatch={dispatch} />
        <DigitButton digit='7' dispatch={dispatch} />
        <DigitButton digit='8' dispatch={dispatch} />
        <DigitButton digit='9' dispatch={dispatch} />
        <OperationButton operation='-' dispatch={dispatch} />
        <DigitButton digit='.' dispatch={dispatch} />
        <DigitButton digit='0' dispatch={dispatch} />
        <button className={`${style.spanTwo} ${btnStyle}`} onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>=</button>
      </div>
    </LayoutToExperiments>
  );
}

function DigitButton({ dispatch, digit }) {
  return (
    <button
      className={btnStyle}
      onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}
    >
      {digit}
    </button>
  );
}

function OperationButton({ dispatch, operation }) {
  return (
    <button
      className={btnStyle}
      onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } })}
    >
      {operation}
    </button>
  );
}

export default Calculator