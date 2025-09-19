import React, { useState } from "react";
import { auth } from "./firebase";
import "./Home.css";
import StorageSlider from "./StorageSlider";
import bgImage from "./assets/background.jpg"; // for database options
import logo from "./assets/background2.jpg"; // use the same image as logo

const Home = ({ user }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const closeDropdown = () => setDropdownOpen(false);

  const signOut = async () => {
    try {
      await auth.signOut();
    } catch (err) {
      console.error(err);
    }
  };

  const getInitials = () => {
    if (user.displayName) {
      const names = user.displayName.split(" ");
      return (
        (names[0][0] || "").toUpperCase() + (names[1]?.[0] || "").toUpperCase()
      );
    }
    return (
      (user.email[0] || "").toUpperCase() + (user.email[1] || "").toUpperCase()
    );
  };

  return (
    <div className="home-container">
      <header className="home-header">
        {/* Left: Logo */}
        <div className="logo-container">
          <img src={logo} alt="App Logo" className="logo" />
        </div>

        {/* Right: User Info */}
        <div className="user-info">
          <span className="user-name">{user.displayName || user.email}</span>
          <div className="avatar-container">
            <div className="generic-avatar" onClick={toggleDropdown}>
              {getInitials()}
            </div>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <div className="dropdown-row">
                  <span className="dropdown-item" onClick={signOut}>
                    Sign out
                  </span>
                  <span className="close-btn" onClick={closeDropdown}>
                    ×
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
     
      <main className="home-content">


        <section className="database-section">
          <h2>Our Database Services</h2>

          {/* Option 1 - Image Left */}
          <div className="database-option left">
            <img
              src={bgImage}
              alt="Database Service 1"
              className="option-img"
            />
            <div className="option-text">
              <p>
                <strong>
                  Data Center: The Core Infrastructure Powering Digital
                  Operations
                </strong>
                Numerous computer systems and associated equipment that support
                an organization's information technology (IT) activities are
                housed in specialized facilities called data centers. It serves
                as the structural foundation for digital services including
                cloud computing, big data processing, websites, enterprise apps,
                and data storage. Fundamentally, a data center is in charge of
                managing, storing, and distributing information and
                applications. Networking equipment (such as routers and switches
                that control traffic flow), storage systems (such as hard drives
                and solid-state drives for data retention), servers (which carry
                out computation tasks), and security systems (such as firewalls
                and intrusion detection systems) are some of its components.
                Data centers are outfitted with advanced cooling systems (to
                prevent equipment overheating), redundant power sources (like
                generators and uninterruptible power supplies), and stringent
                cybersecurity and physical security measures to prevent
                cyberattacks and unauthorized access. Providing dependable,
                high-performance processing and data storage capabilities is the
                main function of a data center. A user's request is sent to a
                server in a data center via the internet whenever they use an
                online service, such going to a website, streaming a movie, or
                utilizing a cloud application. After processing the request and
                retrieving or altering the data as needed, the server replies to
                the user. Data centers are constructed with redundancy and
                failover systems to manage large data volumes and guarantee
                continuous service. This reduces downtime because if one piece
                of hardware fails, another one takes over immediately. There are
                several types of data centers, including cloud data centers run
                by outside companies like Amazon Web Services (AWS), Google
                Cloud, and Microsoft Azure; colocation facilities where
                companies rent space and resources; and enterprise data centers
                owned and run by a single organization. Users no longer need to
                maintain physical gear thanks to these cloud data centers, which
                provide scalable, on-demand access to computing resources. All
                things considered, a data center is an essential piece of
                digital infrastructure that supports data-driven innovation,
                business continuity, and modern computing.
              </p>
            </div>
          </div>

          {/* Option 2 - Image Right */}
          <div className="database-option right">
            <img
              src={bgImage}
              alt="Database Service 1"
              className="option-img"
            />
            <div className="option-text">
              <p>
                <strong>Data Store</strong>
                The systems and equipment in charge of effectively and securely
                managing and storing digital data are referred to as a data
                store in a data center. Since it contains all types of data that
                businesses need for everyday operations, from structured
                databases to unstructured information like pictures, videos, and
                backups, it is one of the most important parts of a data center.
                Depending on the kind of data and how it must be accessible, a
                data store can be database systems, block storage, file storage,
                or object storage. Block storage, which is utilized in
                high-performance settings like virtual machines and databases,
                divides data into fixed-size pieces. While object storage stores
                data as discrete units (objects) with extensive information,
                allowing for tremendous scalability and flexibility, especially
                in cloud environments, file storage arranges data in a
                hierarchical structure, making it perfect for shared access via
                file systems. Hard disk drives (HDDs), solid-state drives
                (SSDs), and occasionally magnetic tapes for archival storage are
                the physical medium that support these data repositories. High
                availability, fault tolerance, and data integrity are ensured by
                the sophisticated software platforms used to manage these
                storage systems, which take care of redundancy, replication,
                compression, and backup. Performance and robustness are further
                improved by technologies like distributed file systems, RAID,
                and snapshots. To protect against calamities or hardware
                problems, data is frequently copied over several computers or
                even data centers. The data store essentially acts as the
                cornerstone of digital operations in a data center, providing
                scalable, dependable, and quick access to the enormous amounts
                of data produced and used by contemporary services and
                applications.
              </p>
            </div>
          </div>

          {/* Option 3 - Image Left */}
          <div className="database-option left">
            <img
              src={bgImage}
              alt="Database Service 1"
              className="option-img"
            />
            <div className="option-text">
              <p>
                <strong>Data Restore</strong>
                The process of recovering lost, corrupted, erased, or
                inaccessible data from backup systems or other storage media is
                known as data restoration in a data center. In the event that
                data is lost due to hardware failure, software flaws, human
                mistake, cyberattacks, or natural catastrophes, it minimizes
                downtime and ensures business continuity, making it a crucial
                function in data management and disaster recovery. Data is
                regularly backed up in a typical data center setting using a
                variety of methods, including snapshots, incremental or
                differential backups, and complete backups. These backups are
                kept on various storage devices, like disk arrays, tape drives,
                or cloud-based platforms, and several copies are frequently kept
                offsite or in other locations for extra security. Initiating a
                data restore allows services and applications to continue their
                regular activities by retrieving the required data from the
                backup repository and re-establishing it in its original or
                alternate location. In order to minimize data loss and
                accomplish particular recovery time objectives (RTO) and
                recovery point objectives (RPO), advanced restore technologies
                make selective restoration, version control, and point-in-time
                recovery possible. Automated restore procedures are frequently
                used with backup and monitoring software in large data centers
                to expedite recovery and guarantee data integrity all along the
                way. In the end, data restoration is a key element of a data
                center's resilience plan, protecting the digital resources that
                businesses rely on.
              </p>
            </div>
          </div>

        
          <div className="database-option right">
            <img
              src={bgImage}
              alt="Database Service 1"
              className="option-img"
            />
            <div className="option-text">
              <p>
                <strong>Data Disaster Recovery</strong>
              The systematic process of restoring data, systems, and operations following a catastrophic event that results in severe disruption or data loss is known as data disaster recovery in a data center. Hardware malfunctions, ransomware and other cyberattacks, natural disasters like earthquakes, floods, and fires, and even human mistake could fall under this category. Disaster recovery aims to minimize downtime, data loss, and financial impact while ensuring that a company can promptly resume vital services. The processes, tools, and roles required to restore lost or corrupted data and restart systems are described in a well-organized disaster recovery plan (DRP). Regular data backups, offsite or cloud-based replication, failover systems, and recovery time objectives (RTO) and recovery point objectives (RPO), which outline the acceptable amount of data loss and the speed at which systems must be restored, are usually included. Data centers frequently employ hot/cold standby systems or geographically redundant backup locations to make sure that one site can smoothly take over in the event of a site failure. Cloud-based data replication and recovery are made possible by sophisticated solutions such as disaster recovery as a service (DRaaS), which provide scalability and quick failover. All things considered, data disaster recovery is a vital part of a data center's risk management and business continuity plan because it guarantees that critical data and services may be recovered and operational integrity preserved even in the event of significant disruptions.
              </p>
            </div>
          </div>

        </section>

        <section>
          <h2>Storage Selection</h2>
          <StorageSlider />
        </section>
      </main>
    </div>
  );
};

export default Home;
