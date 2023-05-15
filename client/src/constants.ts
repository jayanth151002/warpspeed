export const API_URL = 'https://be-api.cloudpilot.coursepanel.in';

export const code = `
AWSTemplateFormatVersion: '2010-09-09'
Description: Video Streaming Platform

Resources:
  S3Bucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: my-video-streaming-bucket

  CloudFrontDistribution:
    Type: AWS::CloudFront::Distribution
    Properties:
      DistributionConfig:
        Origins:
          - DomainName: !GetAtt S3Bucket.RegionalDomainName
            Id: S3Origin
            S3OriginConfig:
              OriginAccessIdentity: !Sub originaccessidentity/cloudfront/{CloudFrontOriginAccessIdentity}
        Enabled: true
        DefaultCacheBehavior:
          TargetOriginId: S3Origin
          ViewerProtocolPolicy: redirect-to-https
          AllowedMethods:
            - GET
            - HEAD
            - OPTIONS
          CachedMethods:
            - GET
            - HEAD
            - OPTIONS
          Compress: true
          ForwardedValues:
            QueryString: false
            Cookies:
              Forward: none
        ViewerCertificate:
          CloudFrontDefaultCertificate: true

  CloudFrontOriginAccessIdentity:
    Type: AWS::CloudFront::CloudFrontOriginAccess
    Identity
    Properties:
      CloudFrontOriginAccessIdentityConfig:
        Comment: Access S3 bucket content only through CloudFront

  S3BucketPolicy:
    Type: AWS::S3::BucketPolicy
    Properties:
      Bucket: !Ref S3Bucket
      PolicyDocument:
        Version: '2012-10-17'
        Statement:
          - Effect: Allow
            Principal:
              CanonicalUser: !GetAtt CloudFrontOriginAccessIdentity.S3CanonicalUserId
            Action:
              - s3:GetObject
            Resource: !Sub arn:aws:s3:::{S3Bucket}/*

  EC2SecurityGroup:
    Type: AWS::EC2::SecurityGroup
    Properties:
      GroupDescription: Enable access to EC2 instance for video streaming
      SecurityGroupIngress:
        - IpProtocol: tcp
          FromPort: '80'
          ToPort: '80'
          CidrIp: 0.0.0.0/0
        - IpProtocol: tcp
          FromPort: '443'
          ToPort: '443'
          CidrIp: 0.0.0.0/0

`
export const project = {
    introduction: "To create a video streaming platform that serves daily users with 1GB video size and ensures worldwide users can see streams with 100ms latency, you can consider using a combination of AWS services like Amazon CloudFront and Amazon Aurora, as well as Google Cloud Platform. These services provide reliable streaming, low latency, high transfer speeds, and a secure environment. Additionally, using multiple content delivery networks (CDNs) can help improve latency and performance for viewers on various global networks.",
    imgUrl: "https://cloudpilot-systems-design-diagrams.s3.amazonaws.com/diagrams/8f69a890100960d2.png",
    code: code,
    layers: [
        {
            key_features: [
                {
                    explanation: "Amazon CloudFront provides a reliable content delivery network that ensures videos are delivered to users without interruption.",
                    feature: "Reliable Streaming",
                    sourceDocuments: []
                },
                {
                    explanation: "Amazon CloudFront and Amazon Aurora ensure that videos are delivered with low latency, allowing users to watch videos without buffering.",
                    feature: "Low Latency",
                    sourceDocuments: []
                },
                {
                    explanation: "Amazon CloudFront and Amazon Aurora provide high transfer speeds, allowing users to watch videos without delay.",
                    feature: "High Transfer Speeds",
                    sourceDocuments: []
                },
                {
                    explanation: "Amazon CloudFront and Amazon Aurora provide a secure environment for video streaming, protecting user data and preventing unauthorized access.",
                    feature: "Secure Environment",
                    sourceDocuments: []
                }
            ],
            purpose: "To provide reliable streaming, low latency, high transfer speeds, and a secure environment.",
            services: [
                "Amazon CloudFront",
                "Amazon Aurora"
            ],
            title: "AWS Services Layer"
        },
        {
            key_features: [
                {
                    explanation: "Google Cloud Platform provides a reliable content delivery network that ensures videos are delivered to users without interruption.",
                    feature: "Reliable Streaming",
                    sourceDocuments: []
                },
                {
                    explanation: "Google Cloud Platform ensures that videos are delivered with low latency, allowing users to watch videos without buffering.",
                    feature: "Low Latency",
                    sourceDocuments: []
                },
                {
                    explanation: "Google Cloud Platform provides high transfer speeds, allowing users to watch videos without delay.",
                    feature: "High Transfer Speeds",
                    sourceDocuments: []
                },
                {
                    explanation: "Google Cloud Platform provides a secure environment for video streaming, protecting user data and preventing unauthorized access.",
                    feature: "Secure Environment",
                    sourceDocuments: []
                }
            ],
            purpose: "To provide reliable streaming, low latency, high transfer speeds, and a secure environment.",
            services: [
                "Google Cloud Platform"
            ],
            title: "Google Cloud Platform Layer"
        },
        {
            key_features: [
                {
                    explanation: "Using multiple content delivery networks (CDNs) can help improve latency for viewers on various global networks.",
                    feature: "Improved Latency",
                    sourceDocuments: []
                },
                {
                    explanation: "Using multiple content delivery networks (CDNs) can help improve performance for viewers on various global networks.",
                    feature: "Improved Performance",
                    sourceDocuments: []
                }
            ],
            purpose: "To improve latency and performance for viewers on various global networks.",
            services: [
                "Multiple Content Delivery Networks (CDNs)"
            ],
            title: "Content Delivery Networks Layer"
        }
    ],
    title: "Video Streaming Platform",
    source_docs: [
        {
            excerpt: "The company has delivered 3,700 live productions and streaming media projects since it was founded in 1999. Benefits of AWS Reliably streams video content to users throughout Germany and across the globe Creates new environments in seconds instead of days Scales to support hundreds of thousands of users Saves 10 hours per week of caption creation time AWS Services Used Amazon CloudFront Amazon CloudFront is a fast content delivery network (CDN) service that securely delivers data, videos, applications, and APIs to customers globally with low latency, high transfer speeds, all within a developer-friendly environment. Learn more » Amazon Aurora MySQL and PostgreSQL-compatible relational database built for the cloud.",
            source: "https://aws.amazon.com/solutions/case-studies/tv1-eu-case-study/",
            title: "TV1-EU Case Study"
        },
        {
            excerpt: "We're here to help. Contact us Using Google Cloud Platform, 17 Media gained the scalability, availability, and responsiveness to support its fast-growing video streaming services, as well as analyze user data in real time for more informed decision making. Google Cloud Results Obtains the flexibility to ingest 1TB of data per day for analysis to support decision-making Reduces latency from 300 milliseconds to 200 milliseconds and eventually 50 milliseconds Lowers time to deploy new services from 30 minutes to 3 minutes Supports move to daily release cycles from weekly or fortnightly cycles Live video streaming revenues in Asia are growing rapidly.",
            source: "https://cloud.google.com/customers/17-media",
            title: "17 Media Case Study  |  Google Cloud"
        },
        {
            excerpt: "simpler, and faster, for developers and product teams to build creatively with video. Using Daily with Amazon IVS provides reliable live streaming with ultra-low latency, with only a few lines of code. With Daily and Amazon IVS both being quick and easy to use, we’ve solved the hard parts",
            source: "https://aws.amazon.com/blogs/media/how-to-broadcast-video-chats-to-a-streaming-platform-with-ultra-low-latency-using-daily-and-amazon-ivs/",
            title: "How to broadcast video chats to a streaming platform with ultra-low latency using Daily and Amazon IVS | AWS for M&E Blog"
        },
        {
            excerpt: "Media Services and other AWS services to complete a secure, end-to-end video-on-demand automation process. You can stream videos to end-users at scale, deliver low-latency content, and most importantly, secure your videos from unexpected downloads. This solution removes the complexity of",
            source: "https://aws.amazon.com/blogs/media/creating-a-secure-video-on-demand-vod-platform-using-aws/",
            title: "Creating a secure video-on-demand (VOD) platform using AWS | AWS for M&E Blog"
        },
        {
            excerpt: "being executed, the code itself is executed close to the user and all external dependencies are heavily cached. Because of that, from the one million requests Contentful serves per minute, even the slowest 5% requests will perform under 100ms on average in most regions. When looking at the total",
            source: "https://aws.amazon.com/blogs/apn/contentful-delivers-secure-and-low-latency-media-files-worldwide-using-amazon-cloudfront-and-lambda-at-edge/",
            title: "Contentful Delivers Secure and Low-Latency Media Files Worldwide Using Amazon CloudFront and Lambda@Edge | AWS Partner Network (APN) Blog"
        },
        {
            excerpt: "Additionally, we enrich this table with latency measurements initiated from various experiment systems (such as Amazon web properties) that provide us representative latencies for viewers on thousands of global networks. Whenever a user makes a DNS query to resolve a hostname accelerated",
            source: "https://aws.amazon.com/blogs/networking-and-content-delivery/using-multiple-content-delivery-networks-for-video-streaming-part-1/",
            title: "Using multiple content delivery networks for video streaming – part 1 | Networking & Content Delivery"
        }
    ]
}
