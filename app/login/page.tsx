///With content from shadcn/ui and shadcn.io

// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Tabs,
    TabsContent,
    TabsContents,
    TabsList,
    TabsTrigger,
} from "@/components/ui/shadcn-io/tabs"; //with motion (https://www.shadcn.io/components/interactive/tabs)
import { LoginForm } from "@/components/login-form";

export default function Page() {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <Tabs defaultValue="username-tab" className="w-[400px]">
                    <TabsList>
                        <TabsTrigger value="username-tab">Username</TabsTrigger>
                        <TabsTrigger value="email-tab">Email</TabsTrigger>
                    </TabsList>
                    <TabsContents>
                        <TabsContent value="username-tab">
                            <LoginForm className="username-tab" />
                        </TabsContent>
                        <TabsContent value="email-tab">
                            <LoginForm className="email-tab" />
                        </TabsContent>
                    </TabsContents>
                </Tabs>
            </div>
        </div>
    );
}
