/* eslint-disable react/prop-types */
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { formatDateFromMillis, formatHourFromMillis } from '../data/time-utils';

export default class ProblemsListItem extends React.Component {
    _getFormattedDescription(description) {
        if (!description) {
            return;
        }
        if (description.length > 20) {
            description = description.substring(0, 20);
            description = description + '...';
        }
        return "'" + description + "'";
    }

    _getFormattedCategory(category) {
        if (!category) {
            return;
        }
        if (category.length > 30) {
            category = category.substring(0, 30);
            category = category + '...';
        }
        return category;
    }

    render() {
        const { problem } = this.props;
        const reportedDate = problem.getReportedDate();
        return (
            <TouchableOpacity style={styles.card} onPress={this.props.onPress}>
                <View style={{ justifyContent: 'space-around' }}>
                    {/* <Text style={{ fontSize: 12, borderBottomColor: 'black', borderBottomWidth: 1 }}>
                        {problem.city.name}
                    </Text> */}
                    <Text style={{ fontSize: 18 }}>{problem.category}</Text>
                    <Text style={styles.description}>{problem.address}</Text>
                </View>
                <View style={styles.dateArea}>
                    <Text style={styles.date}>{formatDateFromMillis(reportedDate) + ' '}</Text>
                    <Text style={styles.date}>{formatHourFromMillis(reportedDate)}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}
const styles = StyleSheet.create({
    card: {
        height: 100,
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 7,
        margin: 3,
        borderRadius: 10,
        backgroundColor: 'white',
        elevation: 5
    },
    dateArea: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'row',
        padding: 5
    },
    date: {
        color: '#86868a',
        fontStyle: 'italic'
    },
    description: {
        color: '#86868a',
        fontStyle: 'italic'
    }
});
