"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { useState } from "react";
import { signIn } from "next-auth/react";

type LoginProps = {
  params: any;
  searchParams: {
    callbackUrl: string;
    error: string;
  };
};

const Login = (props: LoginProps) => {
  console.log("🚀 ~ file: page.tsx:25 ~ Login ~ props:", props);
  const router = useRouter();
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const signUpSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .refine((value) => !!value, {
        message: "Password is required",
      }),
  });

  const form = useForm<z.infer<typeof signUpSchema>>({
    // resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
    console.log("🚀 ~ file: page.tsx:46 ~ onSubmit ~ values:", values);
    // router.push('menu');

    await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: true,
      callbackUrl: "/menu",
    });
  };

  // const handleInputClick = () => {
  //   setEmail("");
  //   // setPassword('');
  // };

  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="bg-slate-200 p-8 rounded shadow-md w-96">
        <h2 className="text-4xl font-semibold mb-6 text-center text-black-950 uppercase">
          Smart Menu Login
        </h2>
        <h1 className="text-sm font-semibold mb-6 text-center">
          Please enter your Email & Password
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="mb-4 relative">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="Email"
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-center"
                          {...field}
                          // value={email}
                          // onChange={(e) => setEmail(e.target.value)}
                          // onClick={handleInputClick}
                        />
                        {/* <FontAwesomeIcon
                          icon={faEnvelope}
                          className="absolute left-3 top-3 text-gray-600"
                        /> */}
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-950 font-bold" />
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-4 relative">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="password"
                          placeholder="Password"
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-center"
                          {...field}
                        />
                        {/* <FontAwesomeIcon
                          icon={faLock}
                          className="absolute left-3 top-3 text-gray-600"
                        /> */}
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-950 font-bold" />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;
