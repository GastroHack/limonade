import React, { useState } from 'react';
import { Map, List as Set } from "immutable";
import { groupBy } from "ramda";
import { PlusSquareOutlined, MinusSquareOutlined } from '@ant-design/icons';


interface MenuItem {
  category: string;
  name: string;
  price: number;
  code: number;
  added: number;
}

const recommendedCategory = "According to your preferences you may like this items!";

const items: Set<MenuItem> = Set([
    { category: recommendedCategory, name: "Burrito", price: 13.2, code: 0x1F32E, added: 0 },
    { category: recommendedCategory, name: "Garlic bread", price: 2.1, code: 0x1F9C4, added: 0 },
    { category: recommendedCategory, name: "Beer 0,5 l", price: 3.1, code: 0x1F37A, added: 0 },
    { category: "Starters", name: "Garlic bread", price: 2.1, code: 0x1F9C4, added: 0 },
    { category: "Starters", name: "Green salad", price: 2.9, code: 0x1F96C, added: 0 },
    { category: "Starters", name: "Vegetable soup", price: 3.5, code: 0x1F955, added: 0 },
    { category: "Main Courses", name: "Spaghetti Bolognese", price: 11, code: 0x1F35D, added: 0 },
    { category: "Main Courses", name: "Grilled chicken", price: 14.1, code: 0x1F357, added: 0 },
    { category: "Main Courses", name: "Burrito", price: 13.2, code: 0x1F32E, added: 0 },
    { category: "Desserts", name: "Pumpkin pie", price: 4.3, code: 0x1F967, added: 0 },
    { category: "Desserts", name: "Brussels Waffles", price: 3.3, code: 0x1F9C7, added: 0 },
    { category: "Desserts", name: "Pancakes", price: 3.5, code: 0x1F95E, added: 0 }
  ],
);

export const Menu = () => {

  const [card, setCard] = useState<Set<MenuItem>>(items);
  const itemsByCategory = Map(groupBy((i: MenuItem) => i.category, card.toArray()));
  
  const updateCard = (it: MenuItem, updateStep: number) => {
    setCard(
      card.set(
        card.findIndex((i: MenuItem) => i.name === it.name),
        ({...it, added: it.added + updateStep})
      ))
  }
  const itemsCount = card.reduce((acc, next) => next.added + acc, 0);

  return (
      <div>
        <div style={{paddingBottom: 140}}>
          <div style={{margin: "10px 15px", fontSize: 40, fontStyle: "italic", textAlign: "center"}}>Menu</div>
          {itemsByCategory.toArray().map(([category, items]: [string, MenuItem[]]) => <>
            <div
              style={{
                fontSize: 20, paddingTop: 5, marginRight: 10, marginBottom: 20, borderTop: "1px solid grey", marginLeft: 20,
                color: category === recommendedCategory ? "red" : undefined, textDecoration: category === recommendedCategory ? "underline" : undefined
              }}
            >
              {category}
            </div>
            {items.map(it =>
              <div style={{height: 40,fontSize: it.added > 0 ? 18 : undefined,
                fontStyle: it.added > 0 ? "bold" : undefined}}>
                  <div style={{marginLeft: 20, borderBottom: "1px dashed #000", height: 10, marginRight: 200}}>
                    <span style={{background: "#fff", paddingRight: 5}}>{it.name}</span>
                  </div>
                  <div style={{marginRight: 50, float: "right", marginTop: -10}}>
                    <span>{String.fromCodePoint(it.code)} </span>
                    <span>Є {it.price.toFixed(2)}</span>
                    <span style={{marginLeft: 10
                      }}>{it.added}</span>
                        <PlusSquareOutlined
                          style={{marginLeft: 5}}
                          onClick={() => updateCard(it, 1)}
                        />
                        <MinusSquareOutlined
                          style={{marginLeft: 5}}
                          onClick={() => updateCard(it, -1)}
                        />
                    </div>
              </div>
            )}
          </>)}
        </div>
        <div style={{position: "fixed", width: "100%", bottom: 0, boxSizing: "border-box",
                     backgroundColor: "lightgoldenrodyellow", padding: 10}}>
          <div style={{float: "right", marginRight: 20}}>
            {itemsCount > 0 && <span>{itemsCount} courses,</span>}
            <span style={{marginLeft: 6}}>total: Є {card.reduce((acc, next) => next.added * next.price + acc, 0).toFixed(2)}</span>
            <button style={{marginLeft: 10, borderRadius: 15, backgroundColor: "#f0aa2b", height: 40}}>Place the order</button> 
          </div>
        </div>
      </div>
  );
}

export default Menu;
