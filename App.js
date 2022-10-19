// https://stackoverflow.com/questions/69692842/error-message-error0308010cdigital-envelope-routinesunsupported

import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Modal, FlatList, TextInput } from 'react-native';

const HistoryItem = ({ itemExpression, itemResult, onPress }) => (
	<TouchableOpacity
		style={styles.historyCell}
		onPress={onPress}
	>
		<Text style={styles.historyText}>{itemExpression}</Text>
		<Text style={styles.historyText}>= {itemResult}</Text>
	</TouchableOpacity>
);

const Calculator = () => {
	const basicButtons = ['Del', 'C', '%', '/', '7', '8', '9', '*', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '='];

	// Expression and result states
	const [expression, setExpression] = useState('');
	const [result, setResult] = useState('0');

	// History states
	const [history, setHistory] = useState([]);
	const [showHistory, setShowHistory] = useState(false);
	const [selectedHistoryId, setSelectedHistoryId] = useState(null);

	// Search states
	const [query, setQuery] = useState('');
	const [searchResult, setSearchResult] = useState([]);

	// Calculate the expression entered by the user from the keypad
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

	// Handle the button press event from the keypad
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

	// Handle the history item press to update expression and result event
	const renderHistoryItem = ({ item }) => (
		< HistoryItem
			itemExpression={item.expression}
			itemResult={item.result}
			onPress={() => {
				// Clear the query so the search result is not shown, instead the history is shown
				setQuery('');

				// Update the expression and result to the selected history item
				setExpression(item.expression);
				setResult(`=${item.result}`);

				// Close the history modal
				setShowHistory(false);


				setSelectedHistoryId(item.expression);
			}}
		/>
	);

	// Handle the search expression and result with the query entered by the user
	const findInHIstory = (query) => {
		{
			// We split the query into token incase the user want to simultaneously search for multiple number or operator in the history
			function tokenize(input) {
				return input.split(' ');
			}

			// We check if every single token is a substring of the expression or result in the history
			function match(query, expression, result) {
				const tokens = tokenize(query);
				return tokens.some(token => expression.includes(token) || result.includes(token));
			}

			// We filter the history to only show the expression and result that match the query and update the search result
			setSearchResult(history.filter(item => item.expression.includes(query) || item.result.includes(query) || match(query, item.expression, item.result)));
		}


	};


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

			{/* keypad */}
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

			{/* history button */}
			<TouchableOpacity
				style={styles.button}
				onPress={() => setShowHistory(!showHistory)}
			>
				<Text style={styles.buttonText}>History</Text>
			</TouchableOpacity>

			{/* history screen */}
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
							setShowHistory(!showHistory);
						}}
					>
						<Text style={styles.buttonText}>History</Text>
					</TouchableOpacity>

					{/* Need to test on phone device for keyboard type */}
					<TextInput
						style={styles.searchBar}
						keyboardType='numeric'
						placeholder='Insert your query'
						defaultValue=''
						onChangeText={
							(newQuery) => {
								setQuery(newQuery);
								findInHIstory(newQuery);
							}
						}
					/>
				</View>


				<FlatList
					style={styles.historyContainer}
					data={query.length ? searchResult : history}
					renderItem={renderHistoryItem}
					extraData={selectedHistoryId}
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