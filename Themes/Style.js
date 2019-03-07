'use strict';
import React from 'react';
import { StyleSheet, PixelRatio } from 'react-native';

module.exports = StyleSheet.create({
    textTitle: {
        fontFamily: 'Arial Rounded MT Bold',
        fontWeight: "600"
    },
    textSubtitle: {
        fontSize: 12,
        color: '#999'
    },
    listContainer: {
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#d6d7da',
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 4,
        paddingRight: 4,
        marginTop: 8,
        marginLeft: 8,
        marginRight: 8
    },
    listTitle: {
        fontSize: 14,
        fontFamily: 'Arial Rounded MT Bold',
        color: '#005e2d'
    },
    infoSubtext: {
        color: '#575756',
        fontSize: 12
    },
    totalArea: {
        margin: 3,
        backgroundColor: '#005e2d',
        flex: 1,
        height: 45,
        alignItems: 'center',
        borderRadius: 10 / PixelRatio.get()
    },
    remainingArea: {
        margin: 3,
        backgroundColor: '#ff4500',
        height: 36,
        alignItems: 'center',
        borderRadius: 10 / PixelRatio.get()
    },
    distanceArea: {
        margin: 3,
        backgroundColor: '#89AA65',
        height: 42,
        alignItems: 'center',
        borderRadius: 10 / PixelRatio.get()
    },
    alphabetArea: {
        margin: 3,
        paddingTop: 8,
        paddingBottom: 6,
        backgroundColor: '#4AB2CF',
        flex: 0.12,
        alignItems: 'center',
        borderRadius: 10 / PixelRatio.get()
    },
    infoArea: {
        flex: 0.7,
        paddingRight: 5
    },
    statusArea: {
        margin: 3,
        backgroundColor: '#F39200',
        flex: 1,
        height: 45,
        alignItems: 'center',
        borderRadius: 10 / PixelRatio.get()
    },
    listTitleCounter: {
        color: '#fff',
        paddingTop: 4,
        fontSize: 9
    },
    listBigNoCounter: {
        color: '#fff',
        fontSize: 13,
        fontWeight: '400',
        paddingBottom: 4,
        paddingTop: 4
    },
    footerBackground: {
        backgroundColor: '#005e2d',
    },
    content: {
        padding: 8
    },
    informationRemaining: {
        flex: 1, flexDirection: 'row', borderWidth: 1, borderColor: '#ff4500', marginTop: 20,
        backgroundColor: '#ff4500', paddingTop: 10, paddingBottom: 10, paddingLeft: 10, paddingRight: 10
    },
    informationRemainingText: {
        fontSize: 20,
        color: '#fff',
        textAlign: 'right'
    },
    buttonColor: {
        backgroundColor: '#005e2d'
    }
});