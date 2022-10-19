// https://stackoverflow.com/questions/69692842/error-message-error0308010cdigital-envelope-routinesunsupported

import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Modal, FlatList, TextInput } from 'react-native';


const HistoryItem = ({ itemExpression, itemResult }) => (
	<View style={styles.historyCell}>
		<Text style={styles.historyText}>{itemExpression}</Text>
		<Text style={styles.historyText}>= {itemResult}</Text>
	</View>
);

const Calculator = () => {
	const basicButtons = ['Del', 'C', '%', '/', '7', '8', '9', '*', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '='];

	const [expression, setExpression] = useState('');
	const [result, setResult] = useState('0');

	const [history, setHistory] = useState([]);
	const [showHistory, setShowHistory] = useState(false);
	const [historyId, setHistoryId] = useState(null);

	const [query, setQuery] = useState('');
	const [searchResult, setSearchResult] = useState([])

	const evaluateExpression = () => {
		let evaluationResult;

		try {
			evaluationResult = Function(`return (${expression})`)();
			return (Math.round(evaluationResult * 100) / 100).toString();
		}
		catch (error) {
			alert(error.message + `\nPlease re-enter your expression`);
			throw error;
		}
	};

	const handleButtonPress = (button) => {
		// Only show = when = is pressed
		if (result[0] === '=') {
			setResult(result.slice(1));
		}

		// Handle button presses
		switch (button) {
			case 'Del': {
				setExpression(expression.slice(0, -1));
				setResult('0');
				break;
			}
			case 'C': {
				setExpression('');
				setResult('0');
				break;
			}
			case '=': {
				try {
					const evaluationResult = evaluateExpression();

					// Add to history
					setHistory([...history, { expression: expression, result: evaluationResult }]);

					// Update result and expression
					setResult(`=${evaluationResult}`);
					setExpression(evaluationResult);
				}
				catch (error) {
					setExpression(expression);
					setResult('ERROR');
				}
				break;
			}
			default: {
				setExpression(expression + button);
				break;
			}
		}
	};

	const renderHistoryItem = ({ item }) => (
		< HistoryItem itemExpression={item.expression} itemResult={item.result} />
	);

	const findInHIstory = (query) => {
		{
			function tokenize(input) {
				return input.split(' ');
			}

			function match(query, expression, result) {
				const tokens = tokenize(query);
				return tokens.some(token => expression.includes(token) || result.includes(token));
			}

			setSearchResult(history.filter(item => item.expression.includes(query) || item.result.includes(query) || match(query, item.expression, item.result)));
		}


	}


	return (
		<View style={styles.container}>

			{/* main screen */}
			<View style={styles.displayContainer}>

				<Text style={styles.outputText}>
					{expression}
				</Text>

				<Text style={styles.outputText}>
					{result}
				</Text>
			</View>

			<View style={styles.buttonContainer}>
				{
					basicButtons.map((button) => (
						<TouchableOpacity
							key={button}
							style={button === '0' ? styles.zeroButton : styles.button}
							onPress={() => handleButtonPress(button)}
						>
							<Text style={styles.buttonText}>{button}</Text>
						</TouchableOpacity>
					))
				}
			</View>

			<TouchableOpacity
				style={styles.button}
				onPress={() => setShowHistory(!showHistory)}
			>
				<Text style={styles.buttonText}>History</Text>
			</TouchableOpacity>

			<Modal
				animationType="slide"
				visible={showHistory}
				onRequestClose={() => {
					setShowHistory(!showHistory);
				}}
			>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
						padding: 10
					}}
				>
					<TouchableOpacity
						style={styles.button}
						onPress={() => {
							setQuery('');
							setShowHistory(!showHistory)
						}}
					>
						<Text style={styles.buttonText}>History</Text>
					</TouchableOpacity>

					<TextInput
						style={styles.searchBar}
						keyboardType='numeric'
						placeholder='Insert your query'
						defaultValue=''
						onChangeText={
							(newQuery) => {
								setQuery(newQuery);
								findInHIstory(newQuery)
							}
						}
					/>
				</View>


				<FlatList

					style={styles.historyContainer}
					data={query.length ? searchResult : history}
					renderItem={renderHistoryItem}
				/>
			</Modal>

		</View >
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
		justifyContent: 'center'
	},
	displayContainer: {
		flex: 1,
		boderColor: 'black',
		borderWidth: 2,
	},
	buttonContainer: {
		flex: 4,
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	outputText: {
		flex: 1,
		padding: 15,
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'right'
	},
	button: {
		width: '25%',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#DDDDDD',
		padding: 15,
	},
	buttonText: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	zeroButton: {
		width: '50%',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#DDDDDD',
		padding: 15,
	},
	historyContainer: {
		flex: 2,
		boderColor: 'black',
		borderWidth: 2,
		padding: 10,
	},
	historyText: {
		flex: 1,
		padding: 15,
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'right'
	},
	historyCell: {
		flex: 1,
		flexDirection: 'column',
		borderWidth: 2,
		margin: 1
	},
	searchBar: {
		flex: 4,
		flexDirection: 'row',
		flexWrap: 'wrap',
		borderWidth: 2,
		padding: 10,
	},

});

export default Calculator;