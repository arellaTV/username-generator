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
import { FormEvent, useState } from "react";

export function Form() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [favoriteFruit, setFavoriteFruit] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState<DateValueType>({
    startDate: new Date(),
    endDate: null,
  });

  const handleDateOfBirthChange = (newValue: DateValueType) => {
    setDateOfBirth(newValue);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const searchParams = new URLSearchParams();
    searchParams.set("firstName", firstName);
    searchParams.set("lastName", lastName);
    searchParams.set("favoriteFruit", favoriteFruit);
    searchParams.set("dateOfBirth", dateOfBirth?.startDate as string);

    console.log(searchParams.toString());
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="mb-2">Username Generator</CardTitle>
          <CardDescription>
            Enter the details below to generate a unique username.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5 mb-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target?.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5 mb-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                placeholder="Enter your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target?.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5 mb-2">
              <Label htmlFor="lastName">Date of Birth</Label>
              <Datepicker
                value={dateOfBirth}
                onChange={handleDateOfBirthChange}
                asSingle
                useRange={false}
                toggleClassName="absolute right-0 top-0 h-full px-3 text-gray-400 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
                inputClassName="relative flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <div className="flex flex-col space-y-1.5 mb-2">
              <Label htmlFor="fruit">Fruit</Label>
              <FruitSelector
                value={firstName}
                onChange={(fruit: string) => setFavoriteFruit(fruit)}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="submit">Generate</Button>
        </CardFooter>
      </Card>
    </form>
  );
}
