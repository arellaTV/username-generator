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
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BACKEND_ORIGIN } from "@/lib/constants";
import toast from "react-hot-toast";
import { Clipboard, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function Form() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [favoriteFruit, setFavoriteFruit] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState<DateValueType>({
    startDate: new Date(),
    endDate: null,
  });
  const [username, setUsername] = useState("");

  const handleDateOfBirthChange = (newValue: DateValueType) => {
    setDateOfBirth(newValue);
  };

  const formatDate = (date: Date) => {
    return date.toISOString().slice(0, 10);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const searchParams = new URLSearchParams();
    searchParams.set("firstName", firstName);
    searchParams.set("lastName", lastName);
    searchParams.set("favoriteFruit", favoriteFruit);
    searchParams.set(
      "dateOfBirth",
      formatDate(new Date(dateOfBirth?.startDate as string))
    );
    const queryString = searchParams.toString();

    fetch(`${BACKEND_ORIGIN}/username?${queryString}`)
      .then((res) => res.json())
      .then((json) => {
        if (json?.username) {
          setUsername(json?.username);
          toast.success("Username generated");
        } else {
          const errorMessage = json?.message;
          toast.error(errorMessage?.replaceAll(":", ":\n"));
        }
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  };

  const copyToClipboard = () => {
    if (!username) {
      toast.error("Generate a username before copying.");
      return;
    }
    navigator.clipboard.writeText(username);
    toast.success(`'${username}' copied to clipboard`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="max-w-[350px]">
        <CardHeader>
          <CardTitle className="mb-2 flex items-center">
            <User className={cn("mr-2")} /> Username Generator
          </CardTitle>
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
        <CardFooter className="flex flex-col items-start">
          <Button type="submit" className="block mb-4">
            Generate
          </Button>
          <Separator className="mb-4" />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="relative w-full transition-all opacity-80 hover:opacity-100 h-40 bg-sky-100 rounded-md text-sky-900 text-xl font-medium flex justify-center items-center"
                  onClick={copyToClipboard}
                >
                  {username || "--"}
                  <Clipboard
                    className={cn("absolute top-0 right-0 m-2 h-4 w-4")}
                  />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Copy to clipboard</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardFooter>
      </Card>
    </form>
  );
}
