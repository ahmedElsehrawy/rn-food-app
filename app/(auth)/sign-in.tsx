import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { signIn } from "@/lib/appwrite";
import { SignInParams } from "@/type";
import * as Sentry from "@sentry/react-native";
import { Link, router } from "expo-router";
import React, { Fragment, useState } from "react";
import { Alert, Text, View } from "react-native";

const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<SignInParams>({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    const { email, password } = form;
    if (!email || !password) {
      return Alert.alert("Error", "Please enter your email and password");
    }
    setIsSubmitting(true);
    try {
      await signIn({ email, password });
      //@ts-ignore
      router.replace("/");
    } catch (error: any) {
      Alert.alert("Error", error.message);
      Sentry.captureException(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Fragment>
      <View className="p-8 gap-8">
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
          title="Sign In"
          onPress={handleLogin}
          isLoading={isSubmitting}
        />
      </View>
      <View className="flex justify-center mt-5 flex-row gap-2">
        <Text className="base-regular text-gray-100">
          Don't have an account?
        </Text>
        <Link href="/sign-up" className="base-bold text-primary">
          Sign Up
        </Link>
      </View>
    </Fragment>
  );
};

export default SignIn;
