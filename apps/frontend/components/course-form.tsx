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
  universityId: z.string().uuid(),
  name: z.string().min(2).max(50),
  nameShort: z.string().min(2).max(50),
});

export default function CourseForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      universityId: "",
      name: "",
      nameShort: "",
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
          name="universityId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>University</FormLabel>
              <FormControl>
                <Input
                  placeholder="Technical University of Munich"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                The University hosting the course
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Einführung in die Theoretische Informatik"
                  {...field}
                />
              </FormControl>
              <FormDescription>The name of the course</FormDescription>
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
                <Input placeholder="THEO" {...field} />
              </FormControl>
              <FormDescription>The short name of the course</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="flex gap-2" type="submit">
          <PlusIcon className="h-4 w-4" /> Create Course
        </Button>
      </form>
    </Form>
  );
}
