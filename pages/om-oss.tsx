import MemberCard from "@/components/MemberCard";
import { getMembers } from "@/lib/members";
import { Member } from "@/types";
import Link from "next/link";

type AboutUsProps = {
    members: Member[];
}

export default function AboutUs({ members }: AboutUsProps) {
    return (
        <main className="max-w-[1440px] mx-auto px-4 md:px-6 py-8 space-y-20 
                        mt-24 md:mt-36 md:mb-[187px]">
            <div className="max-w-[1116.41px] min-h-[1180px] mx-auto">
                <h1 className="text-center justify-center text-text-heading 
                                text-5xl font-bold leading-[57.60px]">
                    Hils på styret 2026!
                </h1>

                <div className="max-w-[1107px] min-h-[1041px relative pt-[85px]">
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] 
                                    md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-16">


                        {members.map((member) => (
                            <MemberCard
                                key={`${member.name}-${member.title}`} // Sammensatt, tilfelle like navn
                                memberName={member.name}
                                memberTitle={member.title}
                                roleEmail={member.email}
                                memberPicture={member.picturePath}
                            />
                        ))}

                        {/* Bli med i dagen "profil" */}
                        <div className=" rounded-lg text-center mx-auto">
                            <div className={[
                                "w-48 h-48 mx-auto mb-4 rounded-full",
                                "border border-current flex items-center",
                                "justify-center text-text-color text-2xl"
                            ].join(" ")}
                            >
                                deg?
                            </div>

                            <Link
                                href="/bli-med"
                                className={[
                                    "bg-button-bg rounded-4xl px-6 py-4",
                                    "text-button-text outline outline-button-outline",
                                    "hover:bg-button-hover",
                                    "inline-block mt-12 md:mt-14 mx-auto"
                                ].join(" ")}
                            >
                                Bli med i Dagen!
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}


export function getStaticProps() {
    const members = getMembers();
    return {
        props: {
            members,
        },
    };
}