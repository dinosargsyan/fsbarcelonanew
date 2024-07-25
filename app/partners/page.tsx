"use client";

import React, { useEffect, useState } from "react";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { fetchDataFromFirestore } from "../blog/page";
import { Link } from "@nextui-org/link";

fetchDataFromFirestore("partners");

export default function Partners() {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchDataFromFirestore("partners");
      setPartners(data);
    }
    fetchData();
  }, []);

  if (partners.length === 0) {
    return (
      <section className="flex flex-wrap justify-center pb-[120px] pt-[150px]">
        Loading....{" "}
      </section>
    );
  }
  return (
    <section className="pb-[80px] pt-[120px]">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="-mx-4 flex flex-wrap justify-center">
          <h2 className="mb-8 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight">
            Here you can find information about our partners all around Europe.
          </h2>

          <Accordion selectionMode="multiple">
            {partners.map((partner) => (
              <AccordionItem
                key={partner.id}
                aria-label="Accordion 1"
                title={partner.name}
                subtitle={
                  <span className="flex justify-start">
                    <strong> {partner.country}</strong>
                  </span>
                }
              >
                {partner.description}
                <div className="block">
                  <Link
                    isBlock
                    showAnchorIcon
                    href={partner.website}
                    color="primary"
                  >
                    {partner.website_name}
                  </Link>
                </div>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
