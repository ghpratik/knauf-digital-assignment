# Research — Building Materials Digital Experience

**Purpose:** Investigation phase for the _Building Materials Digital Experience_ take-home assignment

---

## 1. Research Goal

The assignment asks for a web application that helps people discover and understand building material products.

Before designing the application, I wanted to understand:

1. Who searches for building materials online?
2. What information do they need to choose a product?
3. How are building products currently organized and searched?
4. What can be learned from existing building-product platforms?
5. What should be included in a small but realistic prototype?

The goal is not to reproduce a complete commercial building-material platform. Instead, the goal is to identify the most useful features for a focused prototype.

---

## 2. Understanding the Users

Building materials are mainly used in professional construction projects, but different people need different information.

### Architects and Specifiers

Architects and specifiers select products during the design phase of a project.

They may care about:

- Technical performance
- Fire resistance
- Thermal and acoustic performance
- Building-code compliance
- Sustainability information
- Product specifications
- CAD and BIM files
- Installation requirements

Their main problem is often finding a product that satisfies several technical requirements at the same time.

### Contractors and Installers

Contractors and installers are more focused on using the product correctly.

They may need:

- Installation instructions
- Application areas
- Product compatibility
- Dimensions
- Packaging information
- Safety information
- Accessories and related products

### Distributors and Merchants

Distributors need information that helps them manage and sell products.

This can include:

- Product identifiers
- Product variants
- Packaging
- Dimensions
- Availability
- Logistics information

### Homeowners and DIY Users

Non-professional users generally need simpler information.

They are more likely to care about:

- What the product is used for
- Where it can be used
- Basic performance
- Ease of installation
- Price or price range
- Images and examples

### Primary User for This Prototype

Although the platform could support several audiences, I decided to primarily design the prototype around **architects, specifiers, and contractors**.

This gives the application a clear focus and makes technical product discovery more important than traditional e-commerce features such as shopping carts and checkout.

---

## 3. The Main Problem

The research suggests that finding a building material is not simply a matter of searching for a product name.

A professional may start with a requirement such as:

> "I need an insulation product for an external wall that has a high fire rating and good thermal performance."

This is different from a typical e-commerce search such as:

> "Show me insulation."

Therefore, the application should help users search based on **what they need the product to do**, not only what the product is called.

### Key Problem

**Users need a fast way to narrow a large collection of technical products using meaningful performance and application criteria.**

This became one of the main design principles for the prototype.

---

## 4. How Building Products Are Organized

The construction industry already has established systems for organizing products and construction work.

One important example is **CSI MasterFormat**, a classification system used in the construction industry to organize specifications and related information.

It contains many divisions covering different areas of construction.

For example:

| Division | Category                      | Example Products                                     |
| -------- | ----------------------------- | ---------------------------------------------------- |
| 03       | Concrete                      | Ready-mix concrete, precast panels, repair materials |
| 04       | Masonry                       | Brick, blocks, stone, mortar                         |
| 05       | Metals                        | Structural steel, metal decking                      |
| 06       | Wood, Plastics & Composites   | Engineered wood, composite products                  |
| 07       | Thermal & Moisture Protection | Insulation, roofing, waterproofing                   |
| 08       | Openings                      | Doors, windows, glazing                              |
| 09       | Finishes                      | Drywall, flooring, tiles, paint                      |
| 10       | Specialties                   | Partitions, signage                                  |
| 32       | Exterior Improvements         | Pavers and landscaping materials                     |

Using the complete classification system would be unnecessary for a small prototype.

### Decision

I will use a simplified category structure:

- Insulation & Thermal
- Drywall & Finishes
- Flooring & Tiling
- Concrete & Masonry
- Roofing & Waterproofing
- Doors
- Windows & Openings

This keeps the application understandable while still being inspired by an established industry classification system.

---

## 5. What Information Does a Professional Need?

Research into existing building-product platforms suggests that a useful product page needs significantly more information than a typical consumer product page.

Important information includes:

- Product description
- Applications
- Technical specifications
- Dimensions
- Performance information
- Installation instructions
- Safety information
- Certifications
- Environmental information
- Product documentation
- CAD/BIM files where relevant

### Example

For an insulation product, useful information could include:

| Information          | Example                |
| -------------------- | ---------------------- |
| Application          | External wall          |
| Material             | Mineral wool           |
| Fire rating          | A1                     |
| Thermal performance  | R-value                |
| Acoustic performance | Sound reduction        |
| Thickness            | 100 mm                 |
| Certification        | Relevant certification |
| Sustainability       | EPD available          |
| Documentation        | Technical datasheet    |

This information can then be used both on the product page and in the filtering system.

---

## 6. Sustainability and Compliance

Building materials are also evaluated based on their environmental and health characteristics.

Two terms that appeared repeatedly during the research are **EPD** and **HPD**.

### EPD — Environmental Product Declaration

An Environmental Product Declaration describes the environmental impact of a product throughout its life cycle.

It can provide information about areas such as:

- Raw materials
- Manufacturing
- Transportation
- Product use
- End of life

### HPD — Health Product Declaration

A Health Product Declaration focuses more on the materials and chemicals contained in a product and their potential health implications.

### Why Include These?

These concepts are useful for the prototype because sustainability and compliance information can be important when selecting materials for professional construction projects.

### Prototype Decision

The product data model will include fields such as:

- Fire rating
- Certifications
- EPD availability
- HPD availability
- Sustainability information

The prototype will use fictional values rather than claiming that the products are real certified products.

---

## 7. Existing Digital Experiences

I reviewed several existing building-product and specification platforms to understand how they approach product discovery.

### ARCAT

ARCAT provides building-product information organized around construction categories and provides access to technical resources such as CAD, BIM, and specification documents.

**What I learned:**
Technical documentation should be easy to find alongside the product.

### Causeway SpecifiedBy

SpecifiedBy provides a large searchable database of construction products and allows professionals to discover products based on different criteria.

**What I learned:**
Search and filtering are central to professional product discovery.

### 4specs

4specs organizes construction products using CSI divisions.

**What I learned:**
Industry-standard classification can provide a useful foundation for organizing products.

### Manufacturer Websites

Modern building-material websites are also beginning to use guided product-selection experiences. Instead of asking users to know the exact product name, these experiences ask questions about things such as:

- Project type
- Application
- Surface or substrate
- Environmental conditions
- Required performance

**What I learned:**
A future version of the application could guide users toward a product instead of relying entirely on traditional search and filters.

---

## 8. Key Research Findings

The research led to several important conclusions.

### Finding 1 — Product discovery should be requirement-driven

Professionals often know what they need to achieve before they know which product they need.

Therefore, filters should include meaningful technical criteria rather than only basic categories.

---

### Finding 2 — Technical information is part of the product experience

A product page should not only describe the product.

It should help users determine whether the product is appropriate for their project.

This means technical specifications, applications, certifications, and documentation should be easy to access.

---

### Finding 3 — Different users need different levels of information

An architect may need BIM files and detailed performance information, while a homeowner may only need a simple explanation of what the product does.

The prototype therefore focuses on professional users while keeping the interface understandable to someone who is not an industry expert.

---

### Finding 4 — Existing industry classifications are useful, but should not dominate the interface

CSI provides a useful structure for organizing products, but exposing the full classification system to every user would make a small application unnecessarily complicated.

The prototype therefore uses a simplified category structure.

---

### Finding 5 — The application should help users recover from over-filtering

Technical filters can easily produce zero results.

Instead of simply showing:

> "No results."

The application should explain the situation and provide an easy way to remove filters.

For example:

> "No products match these requirements. Try removing the A1 fire-rating filter."

---

## 9. Accessibility and Usability

The application should be usable on both desktop and mobile devices.

Important considerations include:

### Keyboard Accessibility

Users should be able to navigate:

- Search
- Filters
- Product cards
- Buttons
- Product details

using a keyboard.

### Visual Accessibility

The interface should provide:

- Sufficient color contrast
- Visible focus states
- Clear labels
- Meaningful error messages
- Alternative text for images

### Responsive Design

Professionals may access the application from:

- Desktop computers
- Laptops
- Tablets
- Mobile phones

On smaller screens, filters should therefore use a mobile-friendly pattern such as a drawer instead of permanently occupying the side of the screen.

### Loading and Error States

The application should also communicate clearly when data is:

- Loading
- Empty
- Unavailable
- Invalid

These states are part of the user experience rather than edge cases.

---

## 10. Data Strategy

The assignment allows fictional or locally stored data.

I decided to create a **fictional building-materials company** and use a local JSON dataset.

The prototype will contain approximately 10–20 fictional products.

The products will have realistic-looking attributes based on the research, such as:

- Category
- Application
- Material
- Dimensions
- Fire rating
- Thermal performance
- Acoustic performance
- Certifications
- EPD/HPD availability
- Product documentation

The values themselves will be fictional.

### Why Fictional Data?

Using fictional data has several advantages:

- No dependency on an external API
- No API keys required
- Easy setup for reviewers
- No risk of accidentally copying protected product content
- Full control over the dataset
- Clear separation between research and implementation

The data model can later be replaced with a real API, CMS, or product-information-management system.

---

## 11. Proposed Product Experience

Based on the research, the prototype will focus on four main actions:

### 1. Browse Products

Users can see available products organized by category.

### 2. Search

Users can search by product name, category, application, or relevant keywords.

### 3. Filter

Users can narrow results using technical and application-related criteria.

Possible filters include:

- Category
- Application
- Material
- Fire rating
- Thermal performance
- Certifications
- Sustainability information

### 4. View Product Details

The product page will provide:

- Product overview
- Applications
- Technical specifications
- Performance information
- Compliance and sustainability information
- Documentation

---

## 12. Scope

The goal is to build a focused prototype rather than a complete commercial platform.

### Included in the First Version

- Product listing
- Search
- Product filtering
- Product detail pages
- Responsive interface
- Fictional product dataset
- Loading states
- Empty states
- Error handling
- Basic accessibility considerations

### Intentionally Not Included

The following are outside the initial scope:

- User accounts
- Shopping cart
- Checkout
- Real-time inventory
- Payments
- Full product comparison system
- Complex product recommendation engine
- Full CSI MasterFormat implementation
- Real manufacturer integrations
- Full document-management system

These could be added in future versions if the prototype were expanded into a production system.

---

## 13. Future Improvements

The research also revealed several interesting features that could be added later.

### Guided Product Selection

Instead of asking users to understand technical filters, the application could ask questions such as:

1. What are you building?
2. Where will the product be used?
3. What performance do you need?
4. Are there fire or sustainability requirements?

The system could then recommend suitable products.

### Product Comparison

Users could select multiple products and compare:

- Performance
- Dimensions
- Certifications
- Sustainability information
- Applications

### Product Systems

Many construction solutions consist of several compatible products rather than one product.

For example:

> Primary material + primer + fasteners + sealant + finishing material

A future version could therefore recommend complete product systems.

### BIM and CAD Resources

For professional users, downloadable BIM and CAD resources could become an important part of the product experience.

---

## 14. Research-to-Design Decisions

The most important outcome of this investigation is how the research influenced the product.

| Research Finding                               | Design Decision                                       |
| ---------------------------------------------- | ----------------------------------------------------- |
| Professionals need technical information       | Include detailed technical specifications             |
| Users search by requirements                   | Provide technical filters                             |
| Industry uses established classifications      | Use a simplified CSI-inspired category structure      |
| Documentation is important                     | Give product documentation a prominent place          |
| Sustainability can influence product selection | Include EPD/HPD and certification information         |
| Users can easily over-filter                   | Provide useful empty states and clear-filter actions  |
| Users work across different devices            | Build responsive layouts                              |
| Job-site environments may be challenging       | Keep the interface simple and accessible              |
| Real product data may be difficult to use      | Use fictional local data                              |
| Guided selection is emerging                   | Consider guided product selection as a future feature |

---

## 15. Assumptions and Limitations

This prototype makes several deliberate assumptions.

### Assumption 1

The primary audience is professional users such as architects, specifiers, and contractors.

### Assumption 2

The prototype is a product-discovery tool rather than an e-commerce platform.

### Assumption 3

The fictional product data represents the structure of real building-product information but should not be interpreted as real technical certification or performance data.

### Limitation

The research is based primarily on publicly available industry resources and existing digital experiences. A production system would benefit from interviews or usability testing with actual architects, contractors, and other construction professionals.

---

## 16. Conclusion

The research suggests that a good building-material product experience should do more than display a list of products.

The most important capability is helping users move from a **project requirement** to a **suitable product**.

For the prototype, this means focusing on:

1. Simple product discovery
2. Requirement-based filtering
3. Clear technical information
4. Easy access to documentation
5. Compliance and sustainability information
6. Responsive and accessible design
7. Clear handling of loading, empty, and error states

The result will be a small, focused product-discovery experience that demonstrates how a professional building-material catalog could help users find and understand products without requiring them to contact a sales representative for every question.

---

## 17. Sources

The following sources were consulted during the investigation:

- Causeway SpecifiedBy — Construction product database for specifiers
- ARCAT — Building product categories and construction resources
- ARCAT — CSI MasterFormat resources
- Sitemap.io — Building materials website design
- ConstructConnect — Product specification and architect-related research
- PlanHub — How architects select products
- Autodesk — CSI Divisions and MasterFormat
- Wikipedia — MasterFormat background
- Archtoolbox — Environmental Product Declarations
- Green Badger — EPD and HPD comparison
- LaForce — LEED and product declarations
- 4specs — Construction products library
- Threekit — Building materials product-selection patterns

The sources informed the **structure, user needs, and product criteria** of the prototype. The actual product data used in the application is fictional and was created specifically for this prototype.
