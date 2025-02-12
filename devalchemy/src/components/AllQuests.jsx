// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";

import {useNavigate} from "react-router-dom";

const quests = [
    { id: 1, title: "Пошук артефактів", description: "Знайдіть стародавні артефакти у забутому храмі." },
    { id: 2, title: "Полювання на дракона", description: "Переможіть дракона, що загрожує селу." },
    { id: 3, title: "Загублений скарб", description: "Розгадайте загадки, щоб знайти загублений скарб піратів." },
];

export default function AllQuestsPage() {
    const navigate = useNavigate();
    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Усі квести</h1>
            <div className="grid gap-4">
                {quests.map((quest) => (
                    <Card key={quest.id}>
                        <CardContent className="p-4">
                            <h2 className="text-xl font-semibold">{quest.title}</h2>
                            <p className="text-gray-600 mb-2">{quest.description}</p>
                            <Button variant="default">Переглянути</Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}