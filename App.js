import { StyleSheet, Text, View, Pressable, FlatList, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Modal } from 'react-native-web';

const KeyboardLayout = ({
  values,
  input, setInput,
  output, setOutput,
  outputText,setOutputText,
  isContinuous, setIsContinuous,
  isFirst, setIsFirst,
  history, setHistory,
  modalVisible, setModalVisible
}) => (
    <View style={styles.row}>
      {values.map((value) => (
        <TouchableOpacity
          key={value}
          onPress={() => {
            if (value === '=') {
              let result
              if (isContinuous) {
                  try {
                      result = eval(input)
                      result = (Math.round(result * 100) / 100).toString()
                  }
                  catch (e) {
                      setOutput('Error')
                  }
                  finally {
                      if (result === undefined)
                          setOutput('Error')
                      else
                          setOutput(result)
                      setIsContinuous(false)
                  }
              }
              else {
                  try {
                      result = eval(input)
                      result = (Math.round(result * 100) / 100).toString()
                  }
                  catch (e) {
                      setOutput('Error')
                  }
                  finally {
                      if (result === undefined)
                          setOutput('Error')
                      else
                          setOutput(result)
                      setIsFirst(true)
                  }
              }
              setHistory([...history, { expression: outputText, result: '= '+ result}]);
            }
            else if (value === 'AC') {
                setInput('')
                setOutput('')
                setOutputText('')
            }
            else if (value === 'DEL') {
              setInput(input.slice(0,-1))
              setOutputText(outputText.slice(0,-1))
            }
            else if (value === decodeURI('%CF%80')) {
                setOutputText(outputText + decodeURI('%CF%80'))
                setInput(input + '3.141592654')
            }
            else if (value === 'e') {
              setOutputText(outputText + value)
              setInput(input + '2.71828')
            }
            else if (value === '^') {
                setOutputText(outputText + '^(')
                setInput(input + `**(`)
            }
            else if (value === decodeURI('%E2%88%9A')) {
                setOutputText(outputText + `${decodeURI('%E2%88%9A')}(`)
                setInput(input + `Math.sqrt(`)
            }
            else if (value === '%') {
              setOutputText(outputText + '%')
              setInput(input + '/100')
            }
            else if (value === 'sin' | value === 'cos' | value === 'tan' | value === 'log') {
              if (isContinuous) {
                  setOutputText(outputText + `${value}(`)
                  setInput(input + `Math.${value}(`)
              }
              else {
                  if (isFirst) {
                      setOutputText(output + `${value}(`)
                      setInput(output + `Math.${value}(`)
                      setIsFirst(false)
                  }
                  else {
                      setOutputText(outputText + `${value}(`)
                      setInput(input + `Math.${value}(`)
                  }
              }
            }
            else if (value == 'HISTORY') {
              setModalVisible(!modalVisible)
            }
            else {
              if (input[input.length - 1] === '+' || input[input.length - 1] === '-' || input[input.length - 1] === '*' || input[input.length - 1] ==='/') {
                if (value === '+' || value === '-' || value === '*' || value ==='/'){
                  setInput(input)
                  setOutputText(outputText)
                }
                else{
                  setInput(input + value)
                  setOutputText(outputText + value)
                }
              }
              else {
                if (isContinuous) {
                  setInput(input + value)
                  setOutputText(outputText + value)
                }
                else {
                  if (isFirst) {
                      setInput(output + value)
                      setOutputText(output + value)
                      setOutput('')
                      setIsFirst(false)
                  }
                  else {
                      setInput(input + value)
                      setOutputText(outputText + value)
                  }
                }
              }
            } 
          }
        }
          style={[
            styles.button,
          ]}
        >
          <Text
            style={[
              styles.buttonLabel
            ]}
          >{value}
          </Text>
        </TouchableOpacity>
      ))
      }
    </View>
);

const HistoryItem = ({outputText, output}) => (
  <View style = {{
		flex: 1,
		flexDirection: 'column',
		borderWidth: 2,
		margin: 1,
    borderColor: 'red',
    borderWidth: 2,
	}}>
    <Text style={styles.output}>{outputText}</Text>
    <Text style={styles.output}>{output}</Text>
  </View> 
);

const App = () => {
  const [outputText, setOutputText] = useState('')
  const [output, setOutput] = useState('')
  const [input, setInput] = useState('')
  const [isContinuous, setIsContinuous] = useState(true)
  const [isFirst, setIsFirst] = useState(true)
  const [history, setHistory] = useState([])
  const [modalVisible, setModalVisible] = useState(false);

  const renderHistoryItem = ({item}) => (
    <HistoryItem
      outputText={item.expression}
      output={item.result}
    />
  );

  return (
    <View style={{flex: 1}}>
      <View style={[styles.container, {flex: 1}]}>
        <Text style={[styles.output, {flex: 1}]}>{outputText}</Text>
        <Text style={[styles.output, {flex: 1}]}>{output}</Text>
      </View>
      <View style={[styles.container, {
        flex: 3,
        flexDirection: "column"
      }]}>
        <KeyboardLayout 
          values = {['sin', 'cos', 'tan', 'log', decodeURI('%CF%80'), 'e', '(', ')', '^', decodeURI('%E2%88%9A'), '%', '!','7','8','9','*','4','5','6','-','1','2','3','+','0','.','DEL','=','AC', 'HISTORY']}
          input ={input}
          setInput={setInput}
          output ={output}
          setOutput = {setOutput}
          outputText ={outputText}
          setOutputText ={setOutputText}
          isContinuous = {isContinuous}
          setIsContinuous = {setIsContinuous}
          isFirst = {isFirst}
          setIsFirst = {setIsFirst}
          history = {history}
          setHistory = {setHistory}
          modalVisible = {modalVisible}
          setModalVisible = {setModalVisible}
        />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={[styles.container, {flex: 1}]}>
          <TouchableOpacity
            onPress ={()=>{
              setModalVisible(!modalVisible)
            }
          }
          style = {styles.box}
          >
            <Text
            style={[
              styles.buttonLabel
            ]}
          >Close
          </Text>
          </TouchableOpacity>
          <FlatList
            data={history}
            renderItem={renderHistoryItem}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    marginLeft: 8,
    marginRight: 8,
    backgroundColor: "black",
  },
  box: {
    justifyContent: 'center',
    textAlign: "center",
    backgroundColor: "oldlace",
    width: 50,
    height: 50,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  button: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    justifyContent: 'center',
    backgroundColor: "oldlace",
    marginHorizontal: "1%",
    minWidth: "21%", 
    minHeight: "25%",
    marginBottom: 6,
    textAlign: "center",
  },
  selected: {
    backgroundColor: "coral",
    borderWidth: 0,
  },
  buttonLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "coral",
  },
  selectedLabel: {
    color: "white",
  },
  label: {
    textAlign: "center",
    marginBottom: 10,
    fontSize: 24,
  },
  output: {
    color: 'white',
    textAlign: "right",
    marginBottom: 10,
    fontSize: 30,
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
  },
});

export default App;
