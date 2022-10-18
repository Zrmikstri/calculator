import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';


const pi = 3.14159265359;


function convert_operator (operator) {
  if (operator === '÷') {
    return '/'
  }
  else if (operator === 'x') {
    return '*'
  }
  else if (operator === '^') {
    return '**'
  }
  else if (operator === 'π') {
    return pi
  }
  else {
    return operator
  }
}

export default class App extends React.Component {
  constructor() {
    super(),
    this.state = {
      showText: "",
      calculateResult: [],
      resultText: "0",
      ans: false,
      blinkCursor: true,
    }
    this.ope_use_one_time = ['/', '*', '-', '+', '**', '=']
    this.ope_has_to_convert = ['÷', 'x', '^', 'π', 'log']
  }

  // blink cursor
  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({blinkCursor: !this.state.blinkCursor});
    }, 500);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }
  

  calculateResult() {
    const text = this.state.calculateResult.join('');
    this.setState({
        resultText: Math.round(eval(text)*10000000000)/10000000000,
    })
    // console.log(this.state.calculateResult)
    // console.log('join', this.state.calculateResult.join(''))
    // console.log(this.state.showText)
  }

  // check button pressed
  buttonPressed(btn) {
    // check if the last button pressed is an operator
    if (this.ope_use_one_time.includes(btn) || this.ope_use_one_time.includes(convert_operator(btn))) {
      let lastChar = this.state.calculateResult.slice(-1).toString()
      if (this.ope_use_one_time.includes(lastChar)) {
        let text = this.state.showText.split('')
        text.pop()
        text.push(btn)
        // if the last button pressed is an operator (is not '='), replace it with the new operator
        if (btn !== '=')
          return this.setState({
            showText: text.join(''),
            calculateResult: this.state.calculateResult.slice(0,-1).concat(convert_operator(btn)),
          })
        
        // if the last button pressed is an operator (is '='), do nothing
        return
      }
    }
    if (btn === '=' && this.state.ans === false) {
      this.setState({
        ans: true,
      })
      return this.calculateResult()
    }
    else if (btn === '=' && this.state.ans === true) {
      return this.setState({
        ans: false,
        showText: this.state.resultText,
        calculateResult: [this.state.resultText],
      })
    }
    else if (btn === 'C') {
      return this.setState({
        showText: this.state.showText.slice(0, -1),
        calculateResult: this.state.calculateResult.slice(0, -1),
    })
    }
    else if (btn === 'AC') {
      return this.setState({
        showText: "",
        calculateResult: [],
        resultText: "0",
        ans: false,
      })
    }
    else if (btn === 'neg') {
      return this.setState({
        showText: this.state.showText + '-(',
        calculateResult: this.state.calculateResult.concat(' -('),
      })
    }
    return this.setState({
      showText: this.state.showText + btn,
      calculateResult: this.state.calculateResult.concat(convert_operator(btn)),
    })
  }

  render() {
    let rows = [];
    let nums = [['(', ')', 'C', 'AC'], ['7', '8', '9', '÷'], 
    ['4', '5', '6', 'x'], ['1', '2', '3', '-'], 
    ['0', '.', 'π', '+'], ['neg', 'log', '^', '=']];
    for (let i = 0; i < 6; i++) {
      let row = [];
      for (let j = 0; j < 4; j++) {
        row.push(<TouchableOpacity key={nums[i][j]} style={styles.item}
        onPress = {() => {this.buttonPressed(nums[i][j])}}>
        <Text style={[styles.btnText, styles.item]}>{nums[i][j]}</Text>
        </TouchableOpacity>);
      }
      rows.push(<View key={i} style={styles.row}>{row}</View>);
    }
  return (
    <View style={styles.container}>
      <View style={styles.text}>
        <Text style={[styles.showText]}>{this.state.showText}
          <Text style={[styles.showText, {color: this.state.blinkCursor ? 'white':'black'}]}>|</Text>
        </Text>
        <Text style={styles.resultText}>{this.state.resultText}</Text>
      </View>
        <View style={styles.button}>
          {rows}
      </View>
    </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    margin: 0,
  },
  text: {
    flex: 2,
    backgroundColor: '#fff',
    textAlign: 'right',
    flexDirection: 'column',
  },
  resultText: {
    flex: 1,
    fontSize: 45,
    color: 'red',
    borderTopWidth: 2,
    padding: 2,
    borderColor: 'blue',
  },
  showText: {
    flex: 2,
    fontSize: 60,
    color: 'black',
    cursor: 'pointer',
    padding: 2,
  },
  btnText: {
    fontSize: 30,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
  },
  item: {
    backgroundColor: '#000',
    flex: 1,
    padding: 2,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 100,
  },
  button: {
    flex: 6,
    backgroundColor: 'black',
    width: '100%',
  },
});