"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { PlusIcon } from "lucide-react";
import { api } from "@/lib/api";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  nameShort: z.string().min(2).max(50),
  country: z.string().regex(/^[A-Z]{2}$/, {
    message: "Country must be in format 'US'",
  }),
  city: z.string().min(2).max(50),
  language: z
    .string()
    .min(2)
    .regex(/^[a-z]{2}-[A-Z]{2}$/, {
      message: "Language must be in format 'en-US'",
    }),
});

export default function UniversityForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      nameShort: "",
      country: "",
      city: "",
      language: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await api.POST("/universities", {
      body: values,
    });
    console.log(result);
    alert("University created");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Technical University of Munich"
                  {...field}
                />
              </FormControl>
              <FormDescription>The name of the university</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nameShort"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short Name</FormLabel>
              <FormControl>
                <Input placeholder="TUM" {...field} />
              </FormControl>
              <FormDescription>
                The short name of the university
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="DE" {...field} />
              </FormControl>
              <FormDescription>
                The country code of the university
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Munich" {...field} />
              </FormControl>
              <FormDescription>The city of the university</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="de-DE" {...field} />
              </FormControl>
              <FormDescription>
                The language code of the university
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="flex gap-2" type="submit">
          <PlusIcon className="h-4 w-4" /> Create University
        </Button>
      </form>
    </Form>
  );
}
