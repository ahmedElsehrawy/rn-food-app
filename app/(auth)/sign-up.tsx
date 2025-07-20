import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { createUser } from "@/lib/appwrite";
import { Link, router } from "expo-router";
import React, { Fragment, useState } from "react";
import { Alert, Text, View } from "react-native";

const SignUpPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    const { name, email, password } = form;
    if (!name || !email || !password) {
      return Alert.alert("Error", "Please enter your name, email and password");
    }
    setIsSubmitting(true);
    try {
      const user = await createUser({
        name,
        email,
        password,
      });
      console.log("🚀 ~ handleLogin ~ user:", user);
      if (user) {
        //@ts-ignore
        router.replace("/");
      }
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Fragment>
      <View className="p-8 gap-8">
        <CustomInput
          placeholder="Enter your full name"
          label="Full Name"
          value={form.name}
          onChangeText={(text) => setForm({ ...form, name: text })}
        />
        <CustomInput
          placeholder="Enter your email"
          label="Email"
          value={form.email}
          onChangeText={(text) => setForm({ ...form, email: text })}
          keyboardType="email-address"
        />
        <CustomInput
          placeholder="Enter your password"
          label="Password"
          value={form.password}
          onChangeText={(text) => setForm({ ...form, password: text })}
          secureTextEntry={true}
        />
        <CustomButton
          title="Sign Up"
          onPress={handleLogin}
          isLoading={isSubmitting}
        />
      </View>
      <View className="flex justify-center mt-5 flex-row gap-2">
        <Text className="base-regular text-gray-100">
          Already have an account?
        </Text>
        <Link href="/sign-in" className="base-bold text-primary">
          Sign In
        </Link>
      </View>
    </Fragment>
  );
};

export default SignUpPage;
