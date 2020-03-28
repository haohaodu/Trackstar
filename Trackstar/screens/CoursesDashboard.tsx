import { useEffect, useState, useCallback } from "react";
import React from "react";
import { useFocusEffect } from '@react-navigation/native';

import {
  SectionList,
  StyleSheet,
  ScrollView,
  Alert,
  Text,
  View,
  TouchableOpacity
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import {
  Switch,
  Avatar,
  Button,
  Card,
  Title,
  Paragraph
} from "react-native-paper";
import { red100 } from "react-native-paper/lib/typescript/src/styles/colors";
import { mockData_CourseDashboard } from "../mockData_CourseDashboard";
import Styles from "../Styles/CoursesDashboardStyles";
import { iOSUIKit } from "react-native-typography";

import {Course} from "../models";
import { CourseMapper, CourseMapperImpl } from "../data_mappers";

const CoursesDashboard = props => {
  const [showComplete, setShowComplete] = useState(false); // hook state for toggle
  const [formattedCourseData, setFormattedCourseData] = useState([]);
  const navigation = props.navigation;

  useFocusEffect(
    React.useCallback(() => {
      const formattedCourses = formatData(showComplete).then(data => {
        setFormattedCourseData(data);
      });
    }, [])
  );

  const SingleItem = data => {
    const item = data.item;
    return (
      <View style={{ marginBottom: 10 }}>
        <Card
          style={{ paddingVertical: 10 }}
          onPress={() => {
            navigation.navigate("Course", {
              code: item.code,
              name: item.title,
              minGrade: item.minGrade
            });
          }}
        >
          <Card.Title
            title={item.code}
            subtitle={item.title}
            style={{ width: "100%" }}
          />
        </Card>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={["#bcf7ed", "#5273eb"]}
      style={{
        flex: 1,
        flexDirection: "column",
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
    <Text>Show Completed</Text>
    <Switch
      value={showComplete}
      onValueChange={() => {
        setShowComplete(!showComplete);
        const formattedCourses = formatData(!showComplete).then(data => {
          setFormattedCourseData(data);
        });
      }}
    />

      <SectionList
        style={{ marginTop: 50 }}
        sections={formattedCourseData}
        renderItem={SingleItem}
      />

      <View style={{ paddingBottom: 100 }}>
        <Button
          onPress={() => {
            props.navigation.navigate("Add");
          }}
          mode="contained"
        >
          Add Course
        </Button>
      </View>
    </LinearGradient>
  );
};

async function formatData(complete: boolean) {
  const formattedData = [];

  const courseMapper: CourseMapper = new CourseMapperImpl();
  const rawData: Course[] = await courseMapper.all(complete);

  rawData.forEach(course => {
    const courseInfo = {
      title: course.title,
      data: [
        {
          code: course.code,
          title: course.title
        }
      ]
    };
    formattedData.push(courseInfo);
  });

  return formattedData;
}

export default CoursesDashboard;
