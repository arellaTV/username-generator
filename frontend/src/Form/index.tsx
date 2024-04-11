import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FruitSelector } from "./components/FruitSelector";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import { useState } from "react";

export function Form() {
  const [value, setValue] = useState<DateValueType>({
    startDate: new Date(),
    endDate: null,
  });

  const handleValueChange = (newValue: DateValueType) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Username Generator</CardTitle>
        <CardDescription>
          Enter the details below to generate a unique username.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" placeholder="Enter your first name" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" placeholder="Enter your last name" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="lastName">Date of Birth</Label>
              <Datepicker
                value={value}
                onChange={handleValueChange}
                asSingle
                useRange={false}
                toggleClassName="absolute right-0 top-0 h-full px-3 text-gray-400 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
                inputClassName="relative flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Fruit</Label>
              <FruitSelector />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button>Generate</Button>
      </CardFooter>
    </Card>
  );
}
