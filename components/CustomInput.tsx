import { CustomInputProps } from "@/type";
import cn from "clsx";
import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";

const CustomInput = (props: CustomInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View className="w-full">
      <Text className="label">{props.label}</Text>
      <TextInput
        className={cn("input", {
          "border-primary-300": isFocused,
          "border-gray-300": !isFocused,
        })}
        placeholder={props.placeholder}
        placeholderTextColor="#888"
        value={props.value}
        onChangeText={props.onChangeText}
        keyboardType={props.keyboardType || "default"}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={props.secureTextEntry || false}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
};

export default CustomInput;
